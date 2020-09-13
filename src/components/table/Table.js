import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(50);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode; // bad!
      // const $parent = $resizer.$el.closest('.column'); // better but bad
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = (e) => {
        console.log('mousemove');
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
        cells.forEach((el) => (el.style.width = value + 'px'));
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}

// 324 msScripting
// 2362 msRendering
// 627 msPainting
// 477 msSystem
// 1194 msIdle
// 4984 msTotal
