
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AcceptedOrders from './components/AdminPanel/AcceptedOrders';
import AcceptedWithdraws from './components/AdminPanel/AcceptedWithdraws';
import AdminLogin from './components/AdminPanel/AdminLogin';
import Admin from './components/AdminPanel/AdminDashboard';
import AdminSetup from './components/AdminPanel/AdminSetup';
import ApprovedProviders from './components/AdminPanel/ApprovedProviders';
import CancelledOrder from './components/AdminPanel/CancelledOrder';
import CancelledWithdraws from './components/AdminPanel/CancelledWithdraws';
import CompletedOrders from './components/AdminPanel/CompletedOrders';
import Orders from './components/AdminPanel/Orders';
import PendingOrders from './components/AdminPanel/PendingOrders';
import PendingServices from './components/AdminPanel/PendingServices';
import PendingWithdraws from './components/AdminPanel/PendingWithdraws';
import ProviderApprove from './components/AdminPanel/ProviderApprove';
import ProviderEdit from './components/AdminPanel/ProviderEdit';
import Providers from './components/AdminPanel/Providers';
import ProviderUnapprove from './components/AdminPanel/ProviderUnapprove';
import ProviderUnverify from './components/AdminPanel/ProviderUnverify';
import ProviderVerify from './components/AdminPanel/ProviderVerify';
import PublishedServices from './components/AdminPanel/PublishedServices';
import RunningOrders from './components/AdminPanel/RunningOrders';
import ServiceEdit from './components/AdminPanel/ServiceEdit';
import ServicePublish from './components/AdminPanel/ServicePublish';
import Services from './components/AdminPanel/Services';
import ServiceUnpublish from './components/AdminPanel/ServiceUnpublish';
import UnapprovedProviders from './components/AdminPanel/UnapprovedProviders';
import UnpublishedServices from './components/AdminPanel/UnpublishedServices';
import UpdateOrder from './components/AdminPanel/UpdateOrder';
import WithdrawalUpdate from './components/AdminPanel/WithdrawalUpdate';
import Withdraws from './components/AdminPanel/Withdraws';
import AcceptOrRejectWithdrawRequest from './components/Pages/AcceptOrRejectWithdrawRequest';
import AddService from './components/Pages/AddService/AddService';
import LeadGeneration from './components/Pages/AddService/AddServices/LeadGeneration';
import Seo from './components/Pages/AddService/AddServices/Seo';
import SocialMediaMarketing from './components/Pages/AddService/AddServices/SocialMediaMarketing';
import SetService from './components/Pages/AddService/SetService';
import ClientProfile from './components/Pages/Clients/ClientProfile';
import UpdateClientProfile from './components/Pages/Clients/UpdateClientProfile';
import UpdateProfileAsClient from './components/Pages/Clients/UpdateProfileAsClient';
import ConfirmPublishOrCancel from './components/Pages/ConfirmPublishOrCancel';
import FreelancerProfile from './components/Pages/Freelancers/FreelancerProfile/FreelancerProfile';
import UpdateProviderProfile from './components/Pages/Freelancers/FreelancerProfile/UpdateProviderProfile';
import UpdateProfile from './components/Pages/Freelancers/UpdateProfile/UpdateProfile';
import Home from './components/Pages/Home/Home';
import AdminRequireAuth from './components/Pages/Join/AdminRequireAuth';
import Login from './components/Pages/Join/Login';
import RequireAuth from './components/Pages/Join/RequireAuth';
import SignUp from './components/Pages/Join/SignUp';
import ClientSentMessageToProvider from './components/Pages/Messaging/ClientSentMessageToProvider';
import ClientSentMessageToProviderAfterOrder from './components/Pages/Messaging/ClientSentMessageToProviderAfterOrder';
import MessageDetails from './components/Pages/Messaging/MessageDetails';
import Messages from './components/Pages/Messaging/Messages';
import ProviderMessages from './components/Pages/Messaging/ProviderMessages';
import ProviderSentMessageToClient from './components/Pages/Messaging/ProviderSentMessageToClient';
import SentMessages from './components/Pages/Messaging/SentMessages';
import AcceptOrReject from './components/Pages/Orders/AcceptOrReject';
import CancelOrder from './components/Pages/Orders/CancelOrder';
import CompleteOrder from './components/Pages/Orders/CompleteOrder';
import OrderItem from './components/Pages/Orders/OrderItem';
import ReleasePayment from './components/Pages/Orders/ReleasePayment';
import RequestReleasePayment from './components/Pages/Orders/RequestReleasePayment';
import Requirement from './components/Pages/Orders/Requirement';
import Cart from './components/Pages/Payment/Cart';
import Payment from './components/Pages/Payment/Payment';
import Dashboard from './components/Pages/Profile/Dashboard';
import ProviderTransactions from './components/Pages/ProviderTransactions';
import PublishedOrCancelService from './components/Pages/PublishedOrCancelService';
import PostReviewAsaClient from './components/Pages/Reviews/PostReviewAsaClient';
import PostReviewAsaProvider from './components/Pages/Reviews/PostReviewAsaProvider';
import EditService from './components/Pages/Services/EditService';
import LeadGenerationServices from './components/Pages/Services/LeadGenerationServices';
import SeoServices from './components/Pages/Services/SeoServices';
import ServiceDetails from './components/Pages/Services/ServiceDetails';
import Setup from './components/Pages/Setup';
import Transactions from './components/Pages/Transactions';
import WithdrawAcceptOrCancel from './components/Pages/WithdrawAcceptOrCancel';
import WithdrawFunds from './components/Pages/WithdrawFunds';
import Footer  from './components/Shared/Footer';
import Header from './components/Shared/Header';
import Test from './components/Test';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import Settings from './components/AdminPanel/Settings';
import PaymentSetting from './components/AdminPanel/PaymentSetting';
import PaymentUpdate from './components/AdminPanel/PaymentUpdate';
import Contact from './components/Pages/Contact/Contact';
import ContactPageSetting from './components/AdminPanel/ContactPageSetting';
import PageSetting from './components/AdminPanel/PageSetting';
import ContactPageUpdate from './components/AdminPanel/ContactPageUpdate';
import FooterSetup from './components/AdminPanel/FooterSetup';
import FooterUpdate from './components/AdminPanel/FooterUpdate';
import AboutSetup from './components/AdminPanel/AboutSetup';
import AboutPageUpdate from './components/AdminPanel/AboutPageUpdate';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import AcceptPayment from './components/Pages/Freelancers/Freelancers/AcceptPayment';
import AddFundstoBalance from './components/Pages/Freelancers/Freelancers/AddFundstoBalance';
import Categories from './components/AdminPanel/Categories';
import Category from './components/Pages/Services/Category';
import CreateService from './components/Pages/AddService/AddServices/CreateService';
import UpdateUserBalanceAfterWithdraw from './components/AdminPanel/UpdateUserBalanceAfterWithdraw';
import ClientDispute from './components/Pages/Clients/ClientDispute';
import ClientDisputeDetails from './components/Pages/Clients/ClientDisputeDetails';
import ProviderDispute from './components/Pages/Freelancers/Freelancers/ProviderDispute';
import ProviderDisputeDetails from './components/Pages/Freelancers/Freelancers/ProviderDisputeDetails';
import DisputeList from './components/AdminPanel/DisputeList';
import DisputeSolution from './components/AdminPanel/DisputeSolution';
import RefundRequest from './components/AdminPanel/RefundRequest';
import RefundedProcess from './components/AdminPanel/RefundedProcess';
import LogoSetting from './components/AdminPanel/LogoSetting';
import LogoUpdate from './components/AdminPanel/LogoUpdate';
import BannerSetting from './components/AdminPanel/BannerSetting';
import UpdateBanner from './components/AdminPanel/UpdateBanner';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/service/:serviceId' element={<ServiceDetails></ServiceDetails>}></Route>
        <Route path='/category/:slug' element={<Category></Category>}></Route>
        <Route path='/order/:serviceId' element={<RequireAuth><OrderItem></OrderItem></RequireAuth>}></Route>
        <Route path='/cart' element={<RequireAuth><Cart></Cart></RequireAuth>}></Route>
        <Route path='/payment/:orderId' element={<RequireAuth><Payment></Payment></RequireAuth>}></Route>
        <Route path='/acceptpayment/:id' element={<RequireAuth><AcceptPayment></AcceptPayment></RequireAuth>}></Route>

        
        <Route path='/admin/login' element={<AdminLogin></AdminLogin>}></Route>
        <Route path='/admin' element={<AdminRequireAuth><AdminDashboard></AdminDashboard></AdminRequireAuth>}></Route>
        <Route path='/admin/admin-setup' element={<AdminRequireAuth><AdminSetup></AdminSetup></AdminRequireAuth>}></Route>
        <Route path='/admin/providers' element={<AdminRequireAuth><Providers></Providers></AdminRequireAuth>}></Route>
        <Route path='/admin/providers/approved' element={<AdminRequireAuth><ApprovedProviders></ApprovedProviders></AdminRequireAuth>}></Route>
        <Route path='/admin/providers/unapproved' element={<AdminRequireAuth><UnapprovedProviders></UnapprovedProviders></AdminRequireAuth>}></Route>
        <Route path='/admin/provider/:id' element={<AdminRequireAuth><ProviderEdit></ProviderEdit></AdminRequireAuth>}></Route>
        <Route path='/admin/provider/approve/:id' element={<AdminRequireAuth><ProviderApprove></ProviderApprove></AdminRequireAuth>}></Route>
        <Route path='/admin/provider/unapprove/:id' element={<AdminRequireAuth><ProviderUnapprove></ProviderUnapprove></AdminRequireAuth>}></Route>
        <Route path='/admin/provider/verify/:id' element={<AdminRequireAuth><ProviderVerify></ProviderVerify></AdminRequireAuth>}></Route>
        <Route path='/admin/provider/unverify/:id' element={<AdminRequireAuth><ProviderUnverify></ProviderUnverify></AdminRequireAuth>}></Route>
        <Route path='/admin/services' element={<AdminRequireAuth><Services></Services></AdminRequireAuth>}></Route>
        <Route path='/admin/categoris' element={<AdminRequireAuth><Categories></Categories></AdminRequireAuth>}></Route>
        <Route path='/admin/services/pending' element={<AdminRequireAuth><PendingServices></PendingServices></AdminRequireAuth>}></Route>
        <Route path='/admin/services/published' element={<AdminRequireAuth><PublishedServices></PublishedServices></AdminRequireAuth>}></Route>
        <Route path='/admin/services/unpublished' element={<AdminRequireAuth><UnpublishedServices></UnpublishedServices></AdminRequireAuth>}></Route>
        <Route path='/admin/service/publish/:id' element={<AdminRequireAuth><ServicePublish></ServicePublish></AdminRequireAuth>}></Route>
        <Route path='/admin/service/unpublish/:id' element={<AdminRequireAuth><ServiceUnpublish></ServiceUnpublish></AdminRequireAuth>}></Route>
        <Route path='/admin/service/:id' element={<AdminRequireAuth><ServiceEdit></ServiceEdit></AdminRequireAuth>}></Route>
        <Route path='/admin/orders' element={<AdminRequireAuth><Orders></Orders></AdminRequireAuth>}></Route>
        <Route path='/admin/orders/pending' element={<AdminRequireAuth><PendingOrders></PendingOrders></AdminRequireAuth>}></Route>
        <Route path='/admin/orders/accepted' element={<AdminRequireAuth><AcceptedOrders></AcceptedOrders></AdminRequireAuth>}></Route>
        <Route path='/admin/orders/cancelled' element={<AdminRequireAuth><CancelledOrder></CancelledOrder></AdminRequireAuth>}></Route>
        <Route path='/admin/orders/running' element={<AdminRequireAuth><RunningOrders></RunningOrders></AdminRequireAuth>}></Route>
        <Route path='/admin/orders/completed' element={<AdminRequireAuth><CompletedOrders></CompletedOrders></AdminRequireAuth>}></Route>
        <Route path='/admin/order/update/:id' element={<AdminRequireAuth><UpdateOrder></UpdateOrder></AdminRequireAuth>}></Route>
        <Route path='/admin/withdraws' element={<AdminRequireAuth><Withdraws></Withdraws></AdminRequireAuth>}></Route>
        <Route path='/admin/withdraws/pending' element={<AdminRequireAuth><PendingWithdraws></PendingWithdraws></AdminRequireAuth>}></Route>
        <Route path='/admin/withdraws/accepted' element={<AdminRequireAuth><AcceptedWithdraws></AcceptedWithdraws></AdminRequireAuth>}></Route>
        <Route path='/admin/withdraws/cancelled' element={<AdminRequireAuth><CancelledWithdraws></CancelledWithdraws></AdminRequireAuth>}></Route>
        <Route path='/admin/withdraw/update/:id' element={<AdminRequireAuth><WithdrawalUpdate></WithdrawalUpdate></AdminRequireAuth>}></Route>
        <Route path='/admin/withdraw/updatebalance/:id' element={<AdminRequireAuth><UpdateUserBalanceAfterWithdraw></UpdateUserBalanceAfterWithdraw></AdminRequireAuth>}></Route>
        <Route path='/admin/dispute' element={<AdminRequireAuth><DisputeList></DisputeList></AdminRequireAuth>}></Route>
        <Route path='/admin/dispute/:id' element={<AdminRequireAuth><DisputeSolution></DisputeSolution></AdminRequireAuth>}></Route>
        <Route path='/admin/settings' element={<AdminRequireAuth><Settings></Settings></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/payment' element={<AdminRequireAuth><PaymentSetting></PaymentSetting></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/payment-update/:id' element={<AdminRequireAuth><PaymentUpdate></PaymentUpdate></AdminRequireAuth>}></Route>
        <Route path='/admin/page-settings' element={<AdminRequireAuth><PageSetting></PageSetting></AdminRequireAuth>}></Route>
        <Route path='/admin/page-setting/contact' element={<AdminRequireAuth><ContactPageSetting></ContactPageSetting></AdminRequireAuth>}></Route>
        <Route path='/admin/page-setting/about' element={<AdminRequireAuth><AboutSetup></AboutSetup></AdminRequireAuth>}></Route>
        <Route path='/admin/page-setting/about/:id' element={<AdminRequireAuth><AboutPageUpdate></AboutPageUpdate></AdminRequireAuth>}></Route>
        <Route path='/admin/page-setting/contact/:id' element={<AdminRequireAuth><ContactPageUpdate></ContactPageUpdate></AdminRequireAuth>}></Route>
        <Route path='/admin/page-setting/footer/' element={<AdminRequireAuth><FooterSetup></FooterSetup></AdminRequireAuth>}></Route>
        <Route path='/admin/page-setting/footer/:id' element={<AdminRequireAuth><FooterUpdate></FooterUpdate></AdminRequireAuth>}></Route>
        <Route path='/admin/refund' element={<AdminRequireAuth><RefundRequest></RefundRequest></AdminRequireAuth>}></Route>
        <Route path='/admin/refund/:id' element={<AdminRequireAuth><RefundedProcess></RefundedProcess></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/logo' element={<AdminRequireAuth><LogoSetting></LogoSetting></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/logo/:id' element={<AdminRequireAuth><LogoUpdate></LogoUpdate></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/banner/' element={<AdminRequireAuth><BannerSetting></BannerSetting></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/banner/:id' element={<AdminRequireAuth><UpdateBanner></UpdateBanner></AdminRequireAuth>}></Route>
        <Route path='/admin/setting/footer' element={<AdminRequireAuth><FooterSetup></FooterSetup></AdminRequireAuth>}></Route>
 

        <Route path='/acceptorreject/:id' element={<RequireAuth><AcceptOrReject></AcceptOrReject></RequireAuth>}></Route>
        <Route path='/addfundstobalance/:id' element={<RequireAuth><AddFundstoBalance></AddFundstoBalance></RequireAuth>}></Route>
        <Route path='/requirement/:id' element={<RequireAuth><Requirement></Requirement></RequireAuth>}></Route>
        <Route path='/cancelorder/:id' element={<RequireAuth><CancelOrder></CancelOrder></RequireAuth>}></Route>
        <Route path='/complete/:id' element={<RequireAuth><CompleteOrder></CompleteOrder></RequireAuth>}></Route>
        <Route path='/provider-transactions' element={<RequireAuth><ProviderTransactions></ProviderTransactions></RequireAuth>}></Route>
        <Route path='/reviewasaclient/:id' element={<RequireAuth><PostReviewAsaClient></PostReviewAsaClient></RequireAuth>}></Route>
        <Route path='/releasepayment/:id' element={<RequireAuth><ReleasePayment></ReleasePayment></RequireAuth>}></Route>
        <Route path='/requestpayment/:id' element={<RequireAuth><RequestReleasePayment></RequestReleasePayment></RequireAuth>}></Route>
        <Route path='/reviewasaprovider/:id' element={<RequireAuth><PostReviewAsaProvider></PostReviewAsaProvider></RequireAuth>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/freelancer/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/updateprovider/:id' element={<UpdateProviderProfile></UpdateProviderProfile>}></Route>
        <Route path='/message/:serviceId' element={<RequireAuth><ClientSentMessageToProvider></ClientSentMessageToProvider></RequireAuth>}></Route>
        <Route path='/providermessage/:orderId' element={<RequireAuth><ProviderSentMessageToClient></ProviderSentMessageToClient></RequireAuth>}></Route>
        <Route path='/clientmessage/:orderId' element={<RequireAuth><ClientSentMessageToProviderAfterOrder></ClientSentMessageToProviderAfterOrder></RequireAuth>}></Route>
        <Route path='/client/:clientId' element={<ClientProfile></ClientProfile>}></Route>
        <Route path='/providerdispute' element={<RequireAuth><ProviderDispute></ProviderDispute></RequireAuth>}></Route>
        <Route path='/clientdispute' element={<RequireAuth><ClientDispute></ClientDispute></RequireAuth>}></Route>
        <Route path='/clientdispute/:id' element={<RequireAuth><ClientDisputeDetails></ClientDisputeDetails></RequireAuth>}></Route>
        <Route path='/providerdispute/:id' element={<RequireAuth><ProviderDisputeDetails></ProviderDisputeDetails></RequireAuth>}></Route>
        <Route path='/updateclientprofile/:clientId' element={<UpdateClientProfile></UpdateClientProfile>}></Route>
        <Route path='/withdraw/:id' element={<RequireAuth><WithdrawFunds></WithdrawFunds></RequireAuth>}></Route>
        <Route path='/userservice/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/add-service' element={<RequireAuth><AddService></AddService></RequireAuth>}></Route>
        <Route path='/createservice/:slug' element={<RequireAuth><CreateService></CreateService></RequireAuth>}></Route>
        <Route path='/editservice/:id' element={<RequireAuth><EditService></EditService></RequireAuth>}></Route>
        <Route path='/messages' element={<RequireAuth><Messages></Messages></RequireAuth>}></Route>
        <Route path='/sentmessages' element={<RequireAuth><SentMessages></SentMessages></RequireAuth>}></Route>
        <Route path='/inbox/:messageId' element={<RequireAuth><MessageDetails></MessageDetails></RequireAuth>}></Route>
        <Route path='/set-service' element={<RequireAuth><SetService></SetService></RequireAuth>}></Route>
        <Route path='/seo' element={<RequireAuth><Seo></Seo></RequireAuth>}></Route>
        <Route path='/lead' element={<RequireAuth><LeadGeneration></LeadGeneration></RequireAuth>}></Route>
        <Route path='/social' element={<RequireAuth><SocialMediaMarketing></SocialMediaMarketing></RequireAuth>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
        <Route path='/update' element={<RequireAuth><UpdateProfile></UpdateProfile></RequireAuth>}></Route>
        <Route path='/updateclient' element={<RequireAuth><UpdateProfileAsClient></UpdateProfileAsClient></RequireAuth>}></Route>
        <Route path='/setup' element={<RequireAuth><Setup></Setup></RequireAuth>}></Route>
        <Route path='/withdrawal' element={<AcceptOrRejectWithdrawRequest></AcceptOrRejectWithdrawRequest>}></Route>
        <Route path='/servicepublish' element={<PublishedOrCancelService></PublishedOrCancelService>}></Route>
        <Route path='/confirmpublish/:serviceId' element={<ConfirmPublishOrCancel></ConfirmPublishOrCancel>}></Route>
        <Route path='/withdrawacceptorcancel/:id' element={<RequireAuth><WithdrawAcceptOrCancel></WithdrawAcceptOrCancel></RequireAuth>}></Route>
        <Route path='/transactions/' element={<Transactions></Transactions>}></Route>
        <Route path='/seo-services' element={<SeoServices></SeoServices>}></Route>
        <Route path='/lead-generation-services' element={<LeadGenerationServices></LeadGenerationServices>}></Route>


        <Route path='/about' element={<AboutUs></AboutUs>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
