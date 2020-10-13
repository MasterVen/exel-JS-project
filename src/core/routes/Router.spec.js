import { Router } from './Router';
import { Page } from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}
class ExcelPage extends Page {}

describe('Router', () => {
  let router;
  let $root;
  $root = document.createElement('div');
  beforeEach(() => {
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });

  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should render Dashboard Page', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>dashboard</div>');
  });
});
