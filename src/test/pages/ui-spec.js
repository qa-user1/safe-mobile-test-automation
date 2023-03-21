import AddCasePage from './add-case-page';
import AdditemsPage from './add-items-page';
import AddPersonPage from './add-person-page';
import AddTaskPage from './add-task-page';
import ItemPage from './item-page';
import PersonPage from './person-page';
import BarcodeScannerPage from './barcode-scanner-page';
import DesktopAppPage from './desktopApp';
import HomePage from './home-page';
import LoginPage from './loginPage';
import MenuPage from './menu';
import CaseViewPage from './case-view-page';
import SearchCasePage from './search-case-page';
import DiscrepancyReportsPage from './discrepancyReportsPage';
import BasePage from './basePage';
import TaskPage from './task-page';
import TransactionsPage from './transactions-page';
import NotePage from './notes-page';
import MediaPage from './mediaPage';

module.exports = {
    app: new BasePage(),
    login: new LoginPage(),
    addCase: new AddCasePage(),
    addItems: new AdditemsPage(),
    addPerson: new AddPersonPage(),
    addTask: new AddTaskPage(),
    barcodeScanner: new BarcodeScannerPage(),
    // desktopApp: desktopAppPage(platform),
     homePage: new HomePage(),
    menu: new MenuPage(),
    caseView: new CaseViewPage(),
    itemView: new ItemPage(),
    personView: new PersonPage(),
    taskView: new TaskPage(),
    transactions: new TransactionsPage(),
    notes: new NotePage(),
    searchCase: new SearchCasePage(),
    mediaPage: new MediaPage()
    // discrepancyReports: discrepancyReportsPage(platform),
}
