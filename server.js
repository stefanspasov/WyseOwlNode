// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var dispatcher     = new HttpDispatcher();
var port = process.env.PORT || 8081;        // set our port

function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('It works');
});    

dispatcher.onPost("/calc", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
	var p = JSON.parse(req.body);
	var resultC = calculate(p.dl, p.l, p.ys, p.ye, p.pg, p.age_y, p.age_m, p.paye, p.ge, p.td, p.c, p.ar, p.td_ar, p.curr_ar, p.bulk, p.curr_bulk);
	res.end(JSON.stringify(resultC, null, 2));
});


// START THE SERVER
// =============================================================================
http.createServer(handleRequest).listen(port);

// FUNCTIONS
// =============================================================================
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




function calculate(dl, l, ys, ye, pg, age_y, age_m, paye, ge, td, c, ar, td_ar, curr_ar, bulk, curr_bulk) {

var dl; /* Displayed Loan on Government Website*/
var l; /* Location where student loan was applied for */
var ys; /* Year loan was applied for (year start)*/
var ye; /* Year loan was eligible to be repayed*/
var pg; /* Whether it was a Postgraduate loan*/
var age_y; /* Age */
var age_m
var rl; /* Realtime Loan - as of today*/
var rlo;
var paye; /* Whether PAYE is used*/
var ge; /* Gross earnings - not time adjusted*/
var td; /* Time adjustment for gross earnings*/
var c; /* Country of residence/work*/
var curr; /* Currency for gross earnings*/
var exch; /* Exchange Rate*/
var exch_ar; /* Exchange Rate for additional repayments*/
var let_p1; /* Lower earnings threshold for Plan 1 Loan*/
var let_p2; /* Lower earnings threshold for Plan 2 Loan*/
var let_pl; /* Lower earnings threshold for PG Loan*/
var uet; /* Upper earnings threshold for Plan 2 Loan*/
var ar; /* Additional repayments*/
var curr_ar; /* currency of additional repayments*/
var td_ar; /* Time adjustment for additional repayments*/
var tdn; /* Numeric time adjustment for gross earnings*/
var tdn_ar; /* Numeric time adjustment for additional repayments*/
var gef; /* Currency adjusted gross earnings*/
var arf; /* Currency adjusted additional repayments*/
var exch_bulk;
var bulk;
var curr_bulk;
var es; /* Extra savings*/
var eso;
var j1;
var jm1;
var jy1;
var ir1;
var cl1;
var loantype;
var cancelled;
var cancelledy;
var cancelledm;
var cancelledl;
var thisyear = (new Date().getFullYear()); /* Current Year*/
var currentTime = new Date(); /* current time stamp*/
var rdateapril = new Date('04/01/' + (thisyear - 1)); /* Last years loan hangover*/
var tp = (Math.ceil(Math.abs(currentTime - rdateapril) / (1000 * 3600 * 24))) / 365.25; /* Proportion of year passed*/
var ip1_1 = 0.009; /* Plan 1 Interest Rates*/
var ip1_2 = 0.0125; /* Plan 1 Interest Rates*/
var ip2 = 0.03; /* Plan 2 Interest Rates*/
var ipl = 0.03; /* PG Interest Rates*/
var rpi_1 = 0.009 /* Retail Price Index*/
var rpi_2 = 0.016 /* Retail Price Index*/
var rp_p1 = 0.09; /* Repayment proportion Plan 1*/
var rp_p2 = 0.09; /* Repayment proportion Plan 2*/
var rp_pl = 0.06; /* Repayment proportion PG*/
var plan1c = '{"Sheet1":[{"Country":"Afghanistan","Currency":"Afghanis","Exchange_Rate":0.010752,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Albania","Currency":"Leke","Exchange_Rate":0.00482,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Algeria","Currency":"Algerian Dinar","Exchange_Rate":0.006578,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"American Samoa","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Andorra","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Angola","Currency":"Kwanza","Exchange_Rate":0.005535,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Anguilla","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Antarctica","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Antigua and Barbuda","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Argentina","Currency":"Argentine Peso","Exchange_Rate":0.071396,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Armenia","Currency":"Dram","Exchange_Rate":0.001358,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Aruba","Currency":"Aruban Guilder","Exchange_Rate":0.36221,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Australia","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Austria","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Azerbaijan","Currency":"Azerbaijanian Manat","Exchange_Rate":0.661423,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Bahamas","Currency":"Bahamian Dollar","Exchange_Rate":0.651585,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Bahrain","Currency":"Bahrain Dinar","Exchange_Rate":1.719265,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Bangladesh","Currency":"Taka","Exchange_Rate":0.007731,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Barbados","Currency":"Barbados Dollar","Exchange_Rate":0.324175,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Belarus","Currency":"Belarusian Ruble","Exchange_Rate":0.000043,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Belgium","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Belize","Currency":"Belizean Dollar","Exchange_Rate":0.324265,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Benin","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Bermuda","Currency":"Bermudian Dollar","Exchange_Rate":0.651585,"Earnings_threshold":24490,"Minimum_monthly_repayment":344.4},{"Country":"Bhutan","Currency":"Bhutanese Ngultrum","Exchange_Rate":0.010196,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},' +
    '{"Country":"Bolivia","Currency":"Boliviano","Exchange_Rate":0.090931,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Bonaire, Saint Eustatius and Saba","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Bosnia and Herzegovina","Currency":"Convertible Marka","Exchange_Rate":0.372711,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Botswana","Currency":"Pula","Exchange_Rate":0.065092,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Bouvet Island","Currency":"Norwegian Krone","Exchange_Rate":0.081383,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Brazil","Currency":"Brazilian Real","Exchange_Rate":0.203164,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"British Indian Ocean Territory","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Brunei","Currency":"Brunei Dollar","Exchange_Rate":0.476527,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Bulgaria","Currency":"Bulgarian Lev","Exchange_Rate":0.372705,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Burkina Faso","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Burundi","Currency":"Burundi Franc","Exchange_Rate":0.000413,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Cambodia","Currency":"Riel","Exchange_Rate":0.00016,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Cameroon","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Canada","Currency":"Canadian Dollar","Exchange_Rate":0.514617,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Cape Verde","Currency":"Cape Verde Escudo","Exchange_Rate":0.006566,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Cayman Islands","Currency":"Cayman Islands Dollar","Exchange_Rate":0.790672,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Central African Republic","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Chad","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Channel Islands","Currency":"British Pound","Exchange_Rate":1,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Chile","Currency":"Chilean Peso","Exchange_Rate":0.001011,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"China","Currency":"Yuan Renminbi","Exchange_Rate":0.103366,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Christmas Island","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Cocos (Keeling) Islands","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Colombia","Currency":"Colombian Peso","Exchange_Rate":0.000246,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},' +
    '{"Country":"Comoros","Currency":"Comorian Franc","Exchange_Rate":0.001483,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Congo","Currency":"Congolese Franc","Exchange_Rate":0.000703,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Congo, Democratic Republic of","Currency":"Congolese Franc","Exchange_Rate":0.000703,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Cook Islands","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Costa Rica","Currency":"Costa Rican Colon","Exchange_Rate":0.001219,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Cote dIvoire","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Croatia","Currency":"Kuna","Exchange_Rate":0.095764,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Cuba","Currency":"Cuban Peso","Exchange_Rate":0.64835,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Curacao","Currency":"Antillean Guilder","Exchange_Rate":0.364014,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Cyprus","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Czech Republic","Currency":"Czech Koruna","Exchange_Rate":0.026689,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Denmark","Currency":"Danish Krone","Exchange_Rate":0.097372,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Djibouti","Currency":"Djiboutian Franc","Exchange_Rate":0.003646,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Dominica","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Dominican Republic","Currency":"Dominican Peso","Exchange_Rate":0.01445,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Ecuador","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Egypt","Currency":"Egyptian Pound","Exchange_Rate":0.084767,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"El Salvador","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Equatorial Guinea","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Eritrea","Currency":"Nafka","Exchange_Rate":0.043182,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Estonia","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Ethiopia","Currency":"Ethiopian Birr","Exchange_Rate":0.031444,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Faeroe Islands","Currency":"Danish Krone","Exchange_Rate":0.097372,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Falkland Islands","Currency":"Falkland Pound","Exchange_Rate":1,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},' +
    '{"Country":"Federated States of Micronesia","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Fiji","Currency":"Fiji Dollar","Exchange_Rate":0.313661,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Finland","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"France","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"French Guiana","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"French Polynesia","Currency":"CFP Franc","Exchange_Rate":0.006111,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"French Southern Territories","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Gabon","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Gambia","Currency":"Dalasi","Exchange_Rate":0.015713,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Georgia","Currency":"Lari","Exchange_Rate":0.292235,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Germany","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Ghana","Currency":"Ghanaian Cedi","Exchange_Rate":0.17564,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Gibraltar","Currency":"British Pound","Exchange_Rate":1,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Greece","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Greenland","Currency":"Danish Krone","Exchange_Rate":0.097372,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Grenada","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Guadeloupe","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Guam","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Guatemala","Currency":"Quetzal","Exchange_Rate":0.084803,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Guinea","Currency":"Guinean Franc","Exchange_Rate":0.000089,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Guinea-Bissau","Currency":"CFA Franc (BCEAO)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Guyana","Currency":"Guyanese Dollar","Exchange_Rate":0.003194,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Haiti","Currency":"Gourde","Exchange_Rate":0.013058,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Heard and McDonald Islands","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Holy See (Vatican City State)","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},' +
    '{"Country":"Honduras","Currency":"Lempira","Exchange_Rate":0.029941,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Hong Kong","Currency":"Hong Kong Dollar","Exchange_Rate":0.084062,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Hungary","Currency":"Forint","Exchange_Rate":0.002353,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Iceland","Currency":"Icelandic Krona","Exchange_Rate":0.004947,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"India","Currency":"Indian Rupee","Exchange_Rate":0.010191,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Indonesia","Currency":"Indonesian Rupiah","Exchange_Rate":0.000049,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Iran","Currency":"Iranian Rial","Exchange_Rate":0.000025,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Iraq","Currency":"Iraqi Dinar","Exchange_Rate":0.000555,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Ireland","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Isle of Man","Currency":"British Pound","Exchange_Rate":1,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Israel","Currency":"New Israeli Shekel","Exchange_Rate":0.167121,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Italy","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Jamaica","Currency":"Jamaican Dollar","Exchange_Rate":0.005566,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Japan","Currency":"Yen","Exchange_Rate":0.0054,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Jordan","Currency":"Jordanian Dinar","Exchange_Rate":0.914643,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Kazakhstan","Currency":"Tenge","Exchange_Rate":0.003115,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Kenya","Currency":"Kenya Schilling","Exchange_Rate":0.006665,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Kiribati","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Korea, Democratic Peoples Republic of","Currency":"Won Korea Dem. Rep","Exchange_Rate":0.466523,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Korea, Republic of","Currency":"Won Korea Rep","Exchange_Rate":0.000567,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Kuwait","Currency":"Kuwaiti Dinar","Exchange_Rate":2.161992,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Kyrgyztan Republic","Currency":"Kyrgyzstan Som","Exchange_Rate":0.010219,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Lao PDR","Currency":"Kip","Exchange_Rate":0.00008,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Latvia","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Lebanon","Currency":"Lebanese Pound","Exchange_Rate":0.00043,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Lesotho","Currency":"Loti","Exchange_Rate":0.052138,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},' +
    '{"Country":"Liberia","Currency":"Liberian Dollar (US Dollar in use)","Exchange_Rate":0.651585,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Libya","Currency":"Libyan Dinar","Exchange_Rate":0.487847,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Liechtenstein","Currency":"Swiss Franc","Exchange_Rate":0.681786,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Lithuania","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Luxembourg","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Macau","Currency":"Patacas","Exchange_Rate":0.081203,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Macedonia","Currency":"Macedonian Denar","Exchange_Rate":0.011854,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Madagascar","Currency":"Malagasy Ariary","Exchange_Rate":0.000214,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Malawi","Currency":"Malawi Kwacha","Exchange_Rate":0.00134,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Malaysia","Currency":"Ringgit","Exchange_Rate":0.169751,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Maldives","Currency":"Rufiyaa","Exchange_Rate":0.042736,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Mali","Currency":"CFA Franc (BCEAO)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Malta","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Marshall Islands","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Martinique","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Mauritania","Currency":"Ouguiyas","Exchange_Rate":0.002107,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Mauritius","Currency":"Mauritius Rupee","Exchange_Rate":0.01867,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Mayotte","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Mexico","Currency":"Mexican Peso","Exchange_Rate":0.041495,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Moldova","Currency":"Moldovan Leu","Exchange_Rate":0.035301,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Monaco","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Mongolia","Currency":"Tugrik","Exchange_Rate":0.000332,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Montenegro","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Montserrat","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Morocco","Currency":"Moroccan Dirham","Exchange_Rate":0.06724,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},' +
    '{"Country":"Mozambique","Currency":"Metical","Exchange_Rate":0.017232,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Myanmar","Currency":"Kyat","Exchange_Rate":0.000572,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Namibia","Currency":"Namibian Dollar","Exchange_Rate":0.052086,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Nauru","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Nepal","Currency":"Nepalese Rupee","Exchange_Rate":0.006341,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Netherlands","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"New Caledonia","Currency":"CFP Franc","Exchange_Rate":0.006111,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"New Zealand","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Nicaragua","Currency":"Gold Cordoba","Exchange_Rate":0.023887,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Niger","Currency":"CFA Franc (BCEAO)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Nigeria","Currency":"Nigerian Naira","Exchange_Rate":0.003291,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Niue","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Norfolk Island","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Northern Mariana Islands","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Norway","Currency":"Norwegian Krone","Exchange_Rate":0.081383,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Oman","Currency":"Rial Omani","Exchange_Rate":1.683978,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Pakistan","Currency":"Pakistan Rupee","Exchange_Rate":0.00634,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Palau","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Palestine","Currency":"New Israeli Shekel","Exchange_Rate":0.167121,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Panama","Currency":"Balboas","Exchange_Rate":0.648349,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Papua New Guinea","Currency":"Kina","Exchange_Rate":0.238081,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Paraguay","Currency":"Guarani","Exchange_Rate":0.000127,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Peru","Currency":"New Sol","Exchange_Rate":0.20636,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Philippines","Currency":"Philippine Peso","Exchange_Rate":0.014347,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Pitcairn","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},' +
    '{"Country":"Poland","Currency":"Zloty","Exchange_Rate":0.175041,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Portugal","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Puerto Rico","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Qatar","Currency":"Qatar Riyal","Exchange_Rate":0.178067,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Reunion","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Romania","Currency":"Romanian Leu","Exchange_Rate":0.164021,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Russian Federation","Currency":"Russian Ruble","Exchange_Rate":0.010924,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Rwanda","Currency":"Rwanda Franc","Exchange_Rate":0.000911,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Saint Helena","Currency":"Saint Helena Pound","Exchange_Rate":1,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Saint Kitts and Nevis","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Saint Lucia","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Saint Martin (French part)","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Saint Pierre and Miquelon","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Saint Vincent and Grenadines","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Saint-Barthelemy","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Samoa","Currency":"Tala","Exchange_Rate":0.256516,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"San Marino","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Sao Tome and Principe","Currency":"Dobras","Exchange_Rate":0.000034,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Saudi Arabia","Currency":"Saudi Riyal","Exchange_Rate":0.17373,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Senegal","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Serbia","Currency":"Serbian Dinar","Exchange_Rate":0.006049,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Seychelles","Currency":"Seychelles Rupee","Exchange_Rate":0.048555,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Sierra Leone","Currency":"Leone","Exchange_Rate":0.000151,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Singapore","Currency":"Singapore Dollar","Exchange_Rate":0.475523,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Sint Maarten (Dutch part)","Currency":"Antilles Guilder","Exchange_Rate":0.364014,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},' +
    '{"Country":"Slovakia","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Slovenia","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Solomon Islands","Currency":"Solomon Islands Dollar","Exchange_Rate":0.083001,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Somalia","Currency":"Somali Shilling","Exchange_Rate":0.001243,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"South Africa","Currency":"Rand","Exchange_Rate":0.052086,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"South Georgia and the South Sandwich Islands","Currency":"British Pound","Exchange_Rate":1,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"South Sudan","Currency":"Sudanese Pound","Exchange_Rate":0.10833,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Spain","Currency":"Euro","Exchange_Rate":0.725471,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Sri Lanka","Currency":"Sri Lankan Rupee","Exchange_Rate":0.004802,"Earnings_threshold":3505,"Minimum_monthly_repayment":49.2},{"Country":"Sudan","Currency":"Sudanese Pound","Exchange_Rate":0.10833,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Suriname","Currency":"Surinam Dollar","Exchange_Rate":0.195304,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Svalbard and Jan Mayen Islands","Currency":"Norwegian Krone","Exchange_Rate":0.081383,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Swaziland","Currency":"Lilangeni","Exchange_Rate":0.052103,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Sweden","Currency":"Swedish Krona","Exchange_Rate":0.077393,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Switzerland","Currency":"Swiss Franc","Exchange_Rate":0.681786,"Earnings_threshold":20990,"Minimum_monthly_repayment":295.2},{"Country":"Syria","Currency":"Syrian Pound","Exchange_Rate":0.00399,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Taiwan","Currency":"Taiwan Dollar","Exchange_Rate":0.020564,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Tajikistan","Currency":"Somoni","Exchange_Rate":0.12336,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Thailand","Currency":"Thai Baht","Exchange_Rate":0.01907,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Timor-Leste","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Togo","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Tokelau","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Tonga","Currency":"Pa anga","Exchange_Rate":0.494628,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Trinidad and Tobago","Currency":"Trinidad & Tobago Dollar","Exchange_Rate":0.101917,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Tunisia","Currency":"Tunisian Dinar","Exchange_Rate":0.334047,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},' +
    '{"Country":"Turkey","Currency":"Turkish New Lira","Exchange_Rate":0.244109,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Turkmenistan","Currency":"Turkmenistan New Manat","Exchange_Rate":0.190629,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Turks and Caicos Islands","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Tuvalu","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Uganda","Currency":"Ugandan New Shilling","Exchange_Rate":0.000206,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Ukraine","Currency":"Hryvnia","Exchange_Rate":0.030654,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"United Arab Emirates","Currency":"U.A.E. Dirham","Exchange_Rate":0.176927,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"United Kingdom","Currency":"British Pound","Exchange_Rate":1,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"United Republic of Tanzania","Currency":"Tanzanian Shilling","Exchange_Rate":0.000325,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"United States of America","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Uruguay","Currency":"Uruguayan Peso","Exchange_Rate":0.02415,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Uzbekistan","Currency":"Uzbekistan Sum","Exchange_Rate":0.000256,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Vanuatu","Currency":"Vatu","Exchange_Rate":0.005995,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Venezuela","Currency":"Bolivar Fuerte","Exchange_Rate":0.10108,"Earnings_threshold":10500,"Minimum_monthly_repayment":147.6},{"Country":"Vietnam","Currency":"Dong","Exchange_Rate":0.000033,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Virgin Islands (British)","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Virgin Islands (US)","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Earnings_threshold":14000,"Minimum_monthly_repayment":196.8},{"Country":"Wallis and Futuna Islands","Currency":"CFP Franc","Exchange_Rate":0.006111,"Earnings_threshold":17495,"Minimum_monthly_repayment":246},{"Country":"Western Sahara","Currency":"Moroccan Dirham","Exchange_Rate":0.06724,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Yemen","Currency":"Yemeni Rial","Exchange_Rate":0.003015,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Zambia","Currency":"Zambian Kwacha","Exchange_Rate":0.082437,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4},{"Country":"Zimbabwe","Currency":"Zimbabwean Dollar","Exchange_Rate":0.001791,"Earnings_threshold":7005,"Minimum_monthly_repayment":98.4}]}';
obj = JSON.parse(plan1c);

var plan2pc = '{"Sheet2":[{"Country":"Afghanistan","Currency":"Afghanis","Exchange_Rate":0.010752,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Albania","Currency":"Leke","Exchange_Rate":0.00482,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Algeria","Currency":"Algerian Dinar","Exchange_Rate":0.006578,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"American Samoa","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Andorra","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Angola","Currency":"Kwanza","Exchange_Rate":0.005535,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Anguilla","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Antarctica","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Antigua and Barbuda","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Argentina","Currency":"Argentine Peso","Exchange_Rate":0.071396,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Armenia","Currency":"Dram","Exchange_Rate":0.001358,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Aruba","Currency":"Aruban Guilder","Exchange_Rate":0.36221,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Australia","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Austria","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Azerbaijan","Currency":"Azerbaijanian Manat","Exchange_Rate":0.661423,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Bahamas","Currency":"Bahamian Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Bahrain","Currency":"Bahrain Dinar","Exchange_Rate":1.719265,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Bangladesh","Currency":"Taka","Exchange_Rate":0.007731,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Barbados","Currency":"Barbados Dollar","Exchange_Rate":0.324175,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Belarus","Currency":"Belarusian Ruble","Exchange_Rate":0.000043,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},' +
    '{"Country":"Belgium","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Belize","Currency":"Belizean Dollar","Exchange_Rate":0.324265,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Benin","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Bermuda","Currency":"Bermudian Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":29400,"Upper_income_threshold":57400,"Minimum_monthly_repayment":281.4},{"Country":"Bhutan","Currency":"Bhutanese Ngultrum","Exchange_Rate":0.010196,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Bolivia","Currency":"Boliviano","Exchange_Rate":0.090931,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Bonaire, Saint Eustatius and Saba","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Bosnia and Herzegovina","Currency":"Convertible Marka","Exchange_Rate":0.372711,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Botswana","Currency":"Pula","Exchange_Rate":0.065092,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Bouvet Island","Currency":"Norwegian Krone","Exchange_Rate":0.081383,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Brazil","Currency":"Brazilian Real","Exchange_Rate":0.203164,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"British Indian Ocean Territory","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Brunei","Currency":"Brunei Dollar","Exchange_Rate":0.476527,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Bulgaria","Currency":"Bulgarian Lev","Exchange_Rate":0.372705,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Burkina Faso","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Burundi","Currency":"Burundi Franc","Exchange_Rate":0.000413,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Cambodia","Currency":"Riel","Exchange_Rate":0.00016,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Cameroon","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Canada","Currency":"Canadian Dollar","Exchange_Rate":0.514617,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Cape Verde","Currency":"Cape Verde Escudo","Exchange_Rate":0.006566,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},' +
    '{"Country":"Cayman Islands","Currency":"Cayman Islands Dollar","Exchange_Rate":0.790672,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Central African Republic","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Chad","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Channel Islands","Currency":"British Pound","Exchange_Rate":1,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Chile","Currency":"Chilean Peso","Exchange_Rate":0.001011,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"China","Currency":"Yuan Renminbi","Exchange_Rate":0.103366,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Christmas Island","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Cocos (Keeling) Islands","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Colombia","Currency":"Colombian Peso","Exchange_Rate":0.000246,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Comoros","Currency":"Comorian Franc","Exchange_Rate":0.001483,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Congo","Currency":"Congolese Franc","Exchange_Rate":0.000703,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Congo, Democratic Republic of","Currency":"Congolese Franc","Exchange_Rate":0.000703,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Cook Islands","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Costa Rica","Currency":"Costa Rican Colon","Exchange_Rate":0.001219,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Cote dIvoire","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Croatia","Currency":"Kuna","Exchange_Rate":0.095764,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Cuba","Currency":"Cuban Peso","Exchange_Rate":0.64835,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Curacao","Currency":"Antillean Guilder","Exchange_Rate":0.364014,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Cyprus","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Czech Republic","Currency":"Czech Koruna","Exchange_Rate":0.026689,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},' +
    '{"Country":"Denmark","Currency":"Danish Krone","Exchange_Rate":0.097372,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Djibouti","Currency":"Djiboutian Franc","Exchange_Rate":0.003646,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Dominica","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Dominican Republic","Currency":"Dominican Peso","Exchange_Rate":0.01445,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Ecuador","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Egypt","Currency":"Egyptian Pound","Exchange_Rate":0.084767,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"El Salvador","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Equatorial Guinea","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Eritrea","Currency":"Nafka","Exchange_Rate":0.043182,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Estonia","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Ethiopia","Currency":"Ethiopian Birr","Exchange_Rate":0.031444,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Faeroe Islands","Currency":"Danish Krone","Exchange_Rate":0.097372,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Falkland Islands","Currency":"Falkland Pound","Exchange_Rate":1,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Federated States of Micronesia","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Fiji","Currency":"Fiji Dollar","Exchange_Rate":0.313661,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Finland","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"France","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"French Guiana","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"French Polynesia","Currency":"CFP Franc","Exchange_Rate":0.006111,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"French Southern Territories","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},' +
    '{"Country":"Gabon","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Gambia","Currency":"Dalasi","Exchange_Rate":0.015713,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Georgia","Currency":"Lari","Exchange_Rate":0.292235,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Germany","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Ghana","Currency":"Ghanaian Cedi","Exchange_Rate":0.17564,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Gibraltar","Currency":"British Pound","Exchange_Rate":1,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Greece","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Greenland","Currency":"Danish Krone","Exchange_Rate":0.097372,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Grenada","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Guadeloupe","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Guam","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Guatemala","Currency":"Quetzal","Exchange_Rate":0.084803,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Guinea","Currency":"Guinean Franc","Exchange_Rate":0.000089,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Guinea-Bissau","Currency":"CFA Franc (BCEAO)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Guyana","Currency":"Guyanese Dollar","Exchange_Rate":0.003194,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Haiti","Currency":"Gourde","Exchange_Rate":0.013058,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Heard and McDonald Islands","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Holy See (Vatican City State)","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Honduras","Currency":"Lempira","Exchange_Rate":0.029941,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Hong Kong","Currency":"Hong Kong Dollar","Exchange_Rate":0.084062,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},' +
    '{"Country":"Hungary","Currency":"Forint","Exchange_Rate":0.002353,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Iceland","Currency":"Icelandic Krona","Exchange_Rate":0.004947,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"India","Currency":"Indian Rupee","Exchange_Rate":0.010191,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Indonesia","Currency":"Indonesian Rupiah","Exchange_Rate":0.000049,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Iran","Currency":"Iranian Rial","Exchange_Rate":0.000025,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Iraq","Currency":"Iraqi Dinar","Exchange_Rate":0.000555,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Ireland","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Isle of Man","Currency":"British Pound","Exchange_Rate":1,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Israel","Currency":"New Israeli Shekel","Exchange_Rate":0.167121,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Italy","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Jamaica","Currency":"Jamaican Dollar","Exchange_Rate":0.005566,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Japan","Currency":"Yen","Exchange_Rate":0.0054,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Jordan","Currency":"Jordanian Dinar","Exchange_Rate":0.914643,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Kazakhstan","Currency":"Tenge","Exchange_Rate":0.003115,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Kenya","Currency":"Kenya Schilling","Exchange_Rate":0.006665,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Kiribati","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Korea, Democratic Peoples Republic of","Currency":"Won Korea Dem. Rep","Exchange_Rate":0.466523,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Korea, Republic of","Currency":"Won Korea Rep","Exchange_Rate":0.000567,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Kuwait","Currency":"Kuwaiti Dinar","Exchange_Rate":2.161992,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},' +
    '{"Country":"Kyrgyztan Republic","Currency":"Kyrgyzstan Som","Exchange_Rate":0.010219,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Lao PDR","Currency":"Kip","Exchange_Rate":0.00008,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Latvia","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Lebanon","Currency":"Lebanese Pound","Exchange_Rate":0.00043,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Lesotho","Currency":"Loti","Exchange_Rate":0.052138,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Liberia","Currency":"Liberian Dollar (US Dollar in use)","Exchange_Rate":0.651585,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Libya","Currency":"Libyan Dinar","Exchange_Rate":0.487847,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Liechtenstein","Currency":"Swiss Franc","Exchange_Rate":0.681786,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Lithuania","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Luxembourg","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Macau","Currency":"Patacas","Exchange_Rate":0.081203,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Macedonia","Currency":"Macedonian Denar","Exchange_Rate":0.011854,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Madagascar","Currency":"Malagasy Ariary","Exchange_Rate":0.000214,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Malawi","Currency":"Malawi Kwacha","Exchange_Rate":0.00134,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Malaysia","Currency":"Ringgit","Exchange_Rate":0.169751,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Maldives","Currency":"Rufiyaa","Exchange_Rate":0.042736,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Mali","Currency":"CFA Franc (BCEAO)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Malta","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Marshall Islands","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Martinique","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},' +
    '{"Country":"Mauritania","Currency":"Ouguiyas","Exchange_Rate":0.002107,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Mauritius","Currency":"Mauritius Rupee","Exchange_Rate":0.01867,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Mayotte","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Mexico","Currency":"Mexican Peso","Exchange_Rate":0.041495,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Moldova","Currency":"Moldovan Leu","Exchange_Rate":0.035301,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Monaco","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Mongolia","Currency":"Tugrik","Exchange_Rate":0.000332,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Montenegro","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Montserrat","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Morocco","Currency":"Moroccan Dirham","Exchange_Rate":0.06724,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Mozambique","Currency":"Metical","Exchange_Rate":0.017232,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Myanmar","Currency":"Kyat","Exchange_Rate":0.000572,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Namibia","Currency":"Namibian Dollar","Exchange_Rate":0.052086,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Nauru","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Nepal","Currency":"Nepalese Rupee","Exchange_Rate":0.006341,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Netherlands","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"New Caledonia","Currency":"CFP Franc","Exchange_Rate":0.006111,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"New Zealand","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Nicaragua","Currency":"Gold Cordoba","Exchange_Rate":0.023887,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Niger","Currency":"CFA Franc (BCEAO)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},' +
    '{"Country":"Nigeria","Currency":"Nigerian Naira","Exchange_Rate":0.003291,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Niue","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Norfolk Island","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Northern Mariana Islands","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Norway","Currency":"Norwegian Krone","Exchange_Rate":0.081383,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Oman","Currency":"Rial Omani","Exchange_Rate":1.683978,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Pakistan","Currency":"Pakistan Rupee","Exchange_Rate":0.00634,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Palau","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Palestine","Currency":"New Israeli Shekel","Exchange_Rate":0.167121,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Panama","Currency":"Balboas","Exchange_Rate":0.648349,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Papua New Guinea","Currency":"Kina","Exchange_Rate":0.238081,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Paraguay","Currency":"Guarani","Exchange_Rate":0.000127,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Peru","Currency":"New Sol","Exchange_Rate":0.20636,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Philippines","Currency":"Philippine Peso","Exchange_Rate":0.014347,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Pitcairn","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Poland","Currency":"Zloty","Exchange_Rate":0.175041,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Portugal","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Puerto Rico","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Qatar","Currency":"Qatar Riyal","Exchange_Rate":0.178067,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Reunion","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},' +
    '{"Country":"Romania","Currency":"Romanian Leu","Exchange_Rate":0.164021,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Russian Federation","Currency":"Russian Ruble","Exchange_Rate":0.010924,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Rwanda","Currency":"Rwanda Franc","Exchange_Rate":0.000911,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Saint Helena","Currency":"Saint Helena Pound","Exchange_Rate":1,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Saint Kitts and Nevis","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Saint Lucia","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Saint Martin (French part)","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Saint Pierre and Miquelon","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Saint Vincent and Grenadines","Currency":"East Caribbean Dollar","Exchange_Rate":0.240129,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Saint-Barthelemy","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Samoa","Currency":"Tala","Exchange_Rate":0.256516,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"San Marino","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Sao Tome and Principe","Currency":"Dobras","Exchange_Rate":0.000034,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Saudi Arabia","Currency":"Saudi Riyal","Exchange_Rate":0.17373,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Senegal","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Serbia","Currency":"Serbian Dinar","Exchange_Rate":0.006049,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Seychelles","Currency":"Seychelles Rupee","Exchange_Rate":0.048555,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Sierra Leone","Currency":"Leone","Exchange_Rate":0.000151,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Singapore","Currency":"Singapore Dollar","Exchange_Rate":0.475523,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},' +
    '{"Country":"Sint Maarten (Dutch part)","Currency":"Antilles Guilder","Exchange_Rate":0.364014,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Slovakia","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Slovenia","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Solomon Islands","Currency":"Solomon Islands Dollar","Exchange_Rate":0.083001,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Somalia","Currency":"Somali Shilling","Exchange_Rate":0.001243,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"South Africa","Currency":"Rand","Exchange_Rate":0.052086,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"South Georgia and the South Sandwich Islands","Currency":"British Pound","Exchange_Rate":1,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"South Sudan","Currency":"Sudanese Pound","Exchange_Rate":0.10833,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Spain","Currency":"Euro","Exchange_Rate":0.725471,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Sri Lanka","Currency":"Sri Lankan Rupee","Exchange_Rate":0.004802,"Lower_income_threshold":4200,"Upper_income_threshold":8200,"Minimum_monthly_repayment":40.2},{"Country":"Sudan","Currency":"Sudanese Pound","Exchange_Rate":0.10833,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Suriname","Currency":"Surinam Dollar","Exchange_Rate":0.195304,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Svalbard and Jan Mayen Islands","Currency":"Norwegian Krone","Exchange_Rate":0.081383,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Swaziland","Currency":"Lilangeni","Exchange_Rate":0.052103,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Sweden","Currency":"Swedish Krona","Exchange_Rate":0.077393,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Switzerland","Currency":"Swiss Franc","Exchange_Rate":0.681786,"Lower_income_threshold":25200,"Upper_income_threshold":49200,"Minimum_monthly_repayment":241.2},{"Country":"Syria","Currency":"Syrian Pound","Exchange_Rate":0.00399,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Taiwan","Currency":"Taiwan Dollar","Exchange_Rate":0.020564,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Tajikistan","Currency":"Somoni","Exchange_Rate":0.12336,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Thailand","Currency":"Thai Baht","Exchange_Rate":0.01907,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},' +
    '{"Country":"Timor-Leste","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Togo","Currency":"CFA Franc (BEAC)","Exchange_Rate":0.001112,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Tokelau","Currency":"New Zealand Dollar","Exchange_Rate":0.459208,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Tonga","Currency":"Pa anga","Exchange_Rate":0.494628,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Trinidad and Tobago","Currency":"Trinidad & Tobago Dollar","Exchange_Rate":0.101917,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Tunisia","Currency":"Tunisian Dinar","Exchange_Rate":0.334047,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Turkey","Currency":"Turkish New Lira","Exchange_Rate":0.244109,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Turkmenistan","Currency":"Turkmenistan New Manat","Exchange_Rate":0.190629,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Turks and Caicos Islands","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Tuvalu","Currency":"Australian Dollar","Exchange_Rate":0.494628,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Uganda","Currency":"Ugandan New Shilling","Exchange_Rate":0.000206,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Ukraine","Currency":"Hryvnia","Exchange_Rate":0.030654,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"United Arab Emirates","Currency":"U.A.E. Dirham","Exchange_Rate":0.176927,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"United Kingdom","Currency":"British Pound","Exchange_Rate":1,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"United republic of Tanzania","Currency":"Tanzanian Shilling","Exchange_Rate":0.000325,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"United States of America","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Uruguay","Currency":"Uruguayan Peso","Exchange_Rate":0.02415,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Uzbekistan","Currency":"Uzbekistan Sum","Exchange_Rate":0.000256,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Vanuatu","Currency":"Vatu","Exchange_Rate":0.005995,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},' +
    '{"Country":"Venezuela","Currency":"Bolivar Fuerte","Exchange_Rate":0.10108,"Lower_income_threshold":12600,"Upper_income_threshold":24600,"Minimum_monthly_repayment":120.6},{"Country":"Vietnam","Currency":"Dong","Exchange_Rate":0.000033,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Virgin Islands (British)","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Virgin Islands (US)","Currency":"U.S. Dollar","Exchange_Rate":0.651585,"Lower_income_threshold":16800,"Upper_income_threshold":32800,"Minimum_monthly_repayment":160.8},{"Country":"Wallis and Futuna Islands","Currency":"CFP Franc","Exchange_Rate":0.006111,"Lower_income_threshold":21000,"Upper_income_threshold":41000,"Minimum_monthly_repayment":201},{"Country":"Western Sahara","Currency":"Moroccan Dirham","Exchange_Rate":0.06724,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Yemen","Currency":"Yemeni Rial","Exchange_Rate":0.003015,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Zambia","Currency":"Zambian Kwacha","Exchange_Rate":0.082437,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4},{"Country":"Zimbabwe","Currency":"Zimbabwean Dollar","Exchange_Rate":0.001791,"Lower_income_threshold":8400,"Upper_income_threshold":16400,"Minimum_monthly_repayment":80.4}]}';
obj2 = JSON.parse(plan2pc);

    /************************************************* Input Variables ***************************/
   // dl = document.form.dl.value; /* Displayed Loan on Government Website*/
   // l = document.form.l.value; /* Location where student loan was applied for */
   // ys = document.form.ys.value; /* Year loan was applied for (year start)*/
   // ye = document.form.ye.value; /* Year loan was eligible to be repayed*/
   // pg = document.form.pg.value; /* Whether it was a Postgraduate loan*/
   // age_y = document.form.age_y.value; /* Age */
   // age_m = document.form.age_m.value; /* Age */
   // paye = document.form.paye.value; /* Whether PAYE is used*/
   // ge = document.form.ge.value; /* Gross earnings - not time adjusted*/
   // td = document.form.td.value; /* Time adjustment for gross earnings*/
   // c = document.form.c.value; /* Country of residence/work*/
   // ar = document.form.ar.value; /* Additional repayments*/
   // td_ar = document.form.td_ar.value; /* Time adjustment for additional repayments*/
   // curr_ar = document.form.curr_ar.value; /* currency of additional repayments - NOT CURRENTLY USED*/
   // bulk = document.form.bulk.value;
   // curr_bulk = document.form.curr_bulk.value;
    var age = new Date(age_m + '/01/' + age_y); /* Last years loan hangover*/
    /******************************************* Make time adjustments ********************************/
    if (td == "per year") {
        tdn = 1;
    } else if (td == "per month") {
        tdn = 12;
    } else if (td == "per week") {
        tdn = 52;
    }
    if (td_ar == "per year") {
        tdn_ar = 1;
    } else if (td_ar == "per month") {
        tdn_ar = 12;
    } else if (td_ar == "per week") {
        tdn_ar = 52;
    }

    /* NEED TO FIX OVERALL ERROR MESSAGES */
    if (dl < 0 || dl > 1000000 || ge < 0 || ge > 1000000000 || l == "Select" || ys == "Select" || ye == "Select" || paye == "Select") {
        //alert("Please answer all questions");
        return "error 1";
    }
    /************************************************ PLAN TYPE *****************************************/
    else {
        if (ys == "Before 1999") {
          //  alert("Your loan type is mortgage style loan. Please see the student loans repayment website for further information.");
            return "error 2";
        } else if (ys >= 1999 && l == "Northern Ireland") {
            loantype = "Plan 1";
        } else if (ys >= 1999 && l == "Scotland") {
            loantype = "Plan 1";
        } else if (ys >= 1999 && ys <= 2012 && l == "Wales") {
            loantype = "Plan 1";
        } else if (ys >= 1999 && ys <= 2012 && l == "England") {
            loantype = "Plan 1";
        } else if (ys > 2012 && l == "England" && pg == "No") {
            loantype = "Plan 2";
        } else if (ys > 2012 && l == "England" && pg == "Yes") {
            loantype = "Postgraduate Loan";
        } else if (ys > 2012 && l == "Wales") {
            loantype = "Plan 2";
        } else {
         return "error 3"
        }
    }

    /******************************************************** CANCELLATION ***********************************/
    if (loantype == "Plan 2" || loantype == "Postgraduate Loan") {
        cancelled = 30 - (Math.abs(currentTime - (new Date('04/01/' + (ye)))) / (1000 * 3600 * 24 * 365));
    } else if (loantype == "Plan 1" && (l == "England" || l == "Northern Ireland" || l == "Wales") && ys <= 2005) {
        cancelled = 65 - (Math.abs(currentTime - age) / (1000 * 3600 * 24 * 365));
    } else if (loantype == "Plan 1" && (l == "England" || l == "Northern Ireland" || l == "Wales") && ys > 2005) {
        cancelled = 25 - (Math.abs(currentTime - (new Date('04/01/' + (ye)))) / (1000 * 3600 * 24 * 365));
    } else if (loantype == "Plan 1" && l == "Scotland" && ys <= 2006) {
        cancelled = 65 - (Math.abs(currentTime - age) / (1000 * 3600 * 24 * 365));
    } else if (loantype == "Plan 1" && l == "Scotland" && ys > 2006) {
        cancelled = 25 - (Math.abs(currentTime - (new Date('04/01/' + (ye)))) / (1000 * 3600 * 24 * 365));
    }

    cancelledy = Math.floor(cancelled);
    cancelledm = Math.floor((cancelled - cancelledy) * 12);
    cancelledl = Math.ceil(cancelled * 365);

    /************************************************** OVERSEAS ***************************************/

    if (loantype == "Plan 1") {
        for (var i = 0; i < obj.Sheet1.length; i++) {
            if (obj.Sheet1[i].Country == c) {
                curr = obj.Sheet1[i].Currency;
                exch = obj.Sheet1[i].Exchange_Rate;
                let_p1 = obj.Sheet1[i].Earnings_threshold;
            }
        }
    } else if (loantype == "Plan 2" || loantype == "Postgraduate Loan") {
        for (var i = 0; i < obj2.Sheet2.length; i++) {
            if (obj2.Sheet2[i].Country == c) {
                curr = obj2.Sheet2[i].Currency;
                exch = obj2.Sheet2[i].Exchange_Rate;
                let_p2 = obj2.Sheet2[i].Lower_income_threshold;
                let_pl = obj2.Sheet2[i].Lower_income_threshold;
                uet = obj2.Sheet2[i].Upper_income_threshold;
            }
        }
    }

    for (var i = 0; i < obj.Sheet1.length; i++) {
        if (obj.Sheet1[i].Currency == curr_ar) {
            exch_ar = obj.Sheet1[i].Exchange_Rate;
        }
        if (obj.Sheet1[i].Currency == curr_bulk) {
            exch_bulk = obj.Sheet1[i].Exchange_Rate;
        }
    }

    arf = Number(ar * exch_ar);
    gef = Number(ge * exch); /* Currency Adjust gross earnings */


    var ifrac = ((gef * tdn) - let_p2) / (uet - let_p2); /* Interest fraction for loan type 2 */

    if (tp <= (5 / 12)) {
        if (paye == "No") {
           var rl = Number(dl);
        } else if (paye == "Yes") {
            if (loantype == "Plan 1") {
                if ((gef * tdn) <= let_p1) {
                    rl = dl * (1 + (tp * ip1_1)) - (arf * tp * tdn_ar) - (bulk * exch_bulk);
                } else if ((gef * tdn) > let_p1) {
                    rl = (dl * (1 + (tp * ip1_1)) - (arf * tp * tdn_ar) - ((gef * tdn - let_p1) * tp * rp_p1)) - (bulk * exch_bulk);
                }
            } else if (loantype == "Plan 2") {
                if ((gef * tdn) <= let_p2) {
                    rl = dl * (1 + (tp * rpi_1)) - (arf * tp * tdn_ar) - (bulk * exch_bulk);
                } else if ((gef * tdn) > let_p2 && (gef * tdn) <= uet) {
                    rl = (dl * (1 + (tp * ((ip2 * ifrac) + rpi_1))) - (arf * tp * tdn_ar) - ((gef * tdn - let_p2) * tp * rp_p2)) - (bulk * exch_bulk);
                } else if ((gef * tdn) > uet) {
                    rl = (dl * (1 + (tp * (ip2 + rpi_1))) - (arf * tp * tdn_ar) - ((gef * tdn - let_p2) * tp * rp_p2)) - (bulk * exch_bulk);
                }
            } else if (loantype == "Postgraduate Loan") {
                if ((gef * tdn) <= let_pl) {
                    rl = dl * (1 + (tp * (ipl + rpi_1))) - (arf * tp * tdn_ar) - (bulk * exch_bulk);
                } else if ((gef * tdn) > let_pl) {
                    rl = (dl * (1 + (tp * (ipl + rpi_1))) - (arf * tp * tdn_ar) - ((gef * tdn - let_pl) * tp * rp_pl)) - (bulk * exch_bulk);
                }
            }
        }
    } else {
        if (paye == "No") {
            rl = Number(dl);
        } else if (paye == "Yes") {
            if (loantype == "Plan 1") {
                if ((gef * tdn) <= let_p1) {
                    rl = Number(+dl + (dl * ((5 / 12) * ip1_1)) + (dl * ((tp - (5 / 12)) * ip1_2)) - (arf * tp * tdn_ar) - (bulk * exch_bulk));
                } else if ((gef * tdn) > let_p1) {
                    rl = Number(+dl + (dl * ((5 / 12) * ip1_1)) + (dl * ((tp - (5 / 12)) * ip1_2)) - (arf * tp * tdn_ar) - ((gef * tdn - let_p1) * tp * rp_p1) - (bulk * exch_bulk));
                }
            } else if (loantype == "Plan 2") {
                if ((gef * tdn) <= let_p2) {
                    rl = Number(+dl + (dl * ((5 / 12) * rpi_1)) + (dl * ((tp - (5 / 12)) * rpi_2)) - (arf * tp * tdn_ar) - (bulk * exch_bulk));
                } else if ((gef * tdn) > let_p2 && (gef * tdn) <= uet) {
                    rl = Number(+dl + (dl * ((5 / 12) * ((ip2 * ifrac) + rpi_1))) + (dl * ((tp - (5 / 12)) * ((ip2 * ifrac) + rpi_1))) - (arf * tp * tdn_ar) - ((gef * tdn - let_p2) * tp * rp_p2) - (bulk * exch_bulk));
                } else if ((gef * tdn) > uet) {
                    rl = Number(+dl + (dl * ((5 / 12) * (ip2 + rpi_1))) + (dl * ((tp - (5 / 12)) * (ip2 + rpi_2))) - (arf * tp * tdn_ar) - ((gef * tdn - let_p2) * tp * rp_p2) - (bulk * exch_bulk));
                }
            } else if (loantype == "Postgraduate Loan") {
                if ((gef * tdn) <= let_pl) {
                    rl = Number(+dl + (dl * ((5 / 12) * (ipl + rpi_1))) + (dl * ((tp - (5 / 12)) * (ipl + rpi_2))) - (arf * tp * tdn_ar) - (bulk * exch_bulk));
                } else if ((gef * tdn) > let_pl) {
                    rl = Number(+dl + (dl * ((5 / 12) * (ipl + rpi_1))) + (dl * ((tp - (5 / 12)) * (ipl + rpi_2))) - (arf * tp * tdn_ar) - ((gef * tdn - let_pl) * tp * rp_pl) - (bulk * exch_bulk));
                }
            }
        }
    }
    /******************************** TIME UNTIL LOAN PAID OFF OR CANCELLED ****************************/
 
   var cl = rl;
    var j = 0;
    var ir;
    if (loantype == "Plan 1") {
        if ((gef * tdn) <= let_p1) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * ip1_2;
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar);
                j = j + 1;
            }
        } else if ((gef * tdn) > let_p1) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * ip1_2;
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar) - (((gef * tdn - let_p1) * rp_p1) / 365);
                j = j + 1;
            }
        }
    } else if (loantype == "Plan 2") {
        if ((gef * tdn) <= let_p2) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * rpi_2;
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar);
                j = j + 1;
            }
        } else if ((gef * tdn) > let_p2 && (gef * tdn) <= uet) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * ((ip2 * ifrac) + rpi_2);
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar) - (((gef * tdn - let_p2) * rp_p2) / 365);
                j = j + 1;
            }
        } else if ((gef * tdn) > uet) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * (ip2 + rpi_2);
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar) - (((gef * tdn - let_p2) * rp_p2) / 365);
                j = j + 1;
            }
        }
    } else if (loantype == "Postgraduate Loan") {
        if ((gef * tdn) <= let_pl) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * (ipl + rpi_2);
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar);
                j = j + 1;
            }
        } else if ((gef * tdn) > let_pl) {
            while (cl > 0 && j < (cancelledl)) {
                if ((j % 365) == 0) {
                    ir = cl * (ipl + rpi_2);
                } else {
                    ir = ir;
                }
                cl = (cl + (ir / 365)) - ((arf / 365) * tdn_ar) - (((gef * tdn - let_pl) * rp_pl) / 365);
                j = j + 1;
            }
        }
    }
    var jy = Math.floor(j / 365);
    var jm = Math.floor(((j / 365) - jy) * 12);

    /**************************** TIME UNTIL CANCELLATION NO ADDITIONAL REPAYMENTS ******************************/
    cl1 = rl;
    j1 = 0;
    ir1;
    if (loantype == "Plan 1") {
        if ((gef * tdn) <= let_p1) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * ip1_2;
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 365));
                j1 = j1 + 1;
            }
        } else if ((gef * tdn) > let_p1) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * ip1_2;
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 365)) - (((gef * tdn - let_p1) * rp_p1) / 365);
                j1 = j1 + 1;
            }
        }
    } else if (loantype == "Plan 2") {
        if ((gef * tdn) <= let_p2) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * rpi_2;
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 365));
                j1 = j1 + 1;
            }
        } else if ((gef * tdn) > let_p2 && (gef * tdn) <= uet) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * ((ip2 * ifrac) + rpi_2);
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 365)) - (((gef * tdn - let_p2) * rp_p2) / 365);
                j1 = j1 + 1;
            }
        } else if ((gef * tdn) > uet) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * (ip2 + rpi_2);
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 365)) - (((gef * tdn - let_p2) * rp_p2) / 365);
                j1 = j1 + 1;
            }
        }
    } else if (loantype == "Postgraduate Loan") {
        if ((gef * tdn) <= let_pl) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * (ipl + rpi_2);
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 12));
                j1 = j1 + 1;
            }
        } else if ((gef * tdn) > let_pl) {
            while (cl1 > 0 && j1 < (cancelledl)) {
                if ((j1 % 365) == 0) {
                    ir1 = cl1 * (ipl + rpi_2);
                } else {
                    ir1 = ir1;
                }
                cl1 = (cl1 + (ir1 / 365)) - (((gef * tdn - let_pl) * rp_pl) / 365);
                j1 = j1 + 1;
            }
        }
    }
    var jy1 = Math.floor(j1 / 365);
    var jm1 = Math.floor(((j1 / 365) - jy1) * 12);

    /********************************************** EXTRA SAVED **************************************/
    if (loantype == "Plan 1") {
        if ((gef * tdn) <= let_p1) {
            es = -(j / 365) * (arf * tdn_ar);
        } else if ((gef * tdn) > let_p1) {
            es = (j1 / 365) * ((gef * tdn - let_p1) * rp_p1) - (j / 365) * ((arf * tdn_ar) + ((gef * tdn - let_p1) * rp_p1));
        }
    } else if (loantype == "Plan 2") {
        if ((gef * tdn) <= let_p2) {
            es = -(j / 365) * (arf * tdn_ar);
        } else if ((gef * tdn) > let_p2) {
            es = (j1 / 365) * ((gef * tdn - let_p2) * rp_p2) - (j / 365) * ((arf * tdn_ar) + ((gef * tdn - let_p2) * rp_p2));
        }
    } else if (loantype == "Postgraduate Loan") {
        if ((gef * tdn) <= let_pl) {
            es = -(j / 365) * (arf * tdn_ar);
        } else if ((gef * tdn) > let_pl) {
            es = (j1 / 365) * ((gef * tdn - let_pl) * rp_pl) - (j / 365) * ((arf * tdn_ar) + ((gef * tdn - let_pl) * rp_pl));
        }
    }

    /********************************************** ADDITIONAL REPAYMENT TOTAL **************************************/

    var loancomp;
    if (j == cancelledl) {
        loancomp = "Your loan will be cancelled";
    } else {
        loancomp = jy + " years, " + jm + " months";
    }

    var art = (j / 365) * (arf * tdn_ar);
    var artm = (art / (j * 12 / 365));

    if (j == 0) {
        artm = 0;
    }

    function findr() {
        var n = jy * 12 + jm;
        var pmt = art / n;
        var fv = art + es;
        var y = 1;
        var shif = 1;
        var int = 0.000001;
        if (pmt == 0) {
            shif = 0;
        } else {
            while (y >= 0 && shif > 0) {
                y = (Math.pow((1 + shif), n)) - ((fv / pmt) * shif) - 1;
                shif = shif - int;
            }
        }
		
        return shif;
		
    }
    shif = (Math.pow((1 + findr()), 12) - 1) * 100;
    shifo = parseFloat(Math.round(shif * 100) / 100).toFixed(2);
    var rlo = parseFloat(Math.round(rl * 100) / 100).toFixed(2);
    eso = parseFloat(Math.round(es * 100) / 100).toFixed(2);
    arto = parseFloat(Math.round(art * 100) / 100).toFixed(2);
    artmo = parseFloat(Math.round(artm * 100) / 100).toFixed(2);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    rlo = numberWithCommas(rlo);
    eso = numberWithCommas(eso);
    arto = numberWithCommas(arto);
    artmo = numberWithCommas(artmo);

    if (rlo < 0) {
        rlo = 0;
    }

	
	return ["£" + rlo, loantype, loancomp, cancelledy + " years, " + cancelledm + " months", "£" + eso, "£" + arto, "£" + artmo, shifo + "%"];
    // document.getElementById('rl').innerHTML = "£" + rlo;
    // document.getElementById('loantype').innerHTML = loantype;
    // document.getElementById('tcanc').innerHTML = loancomp;
    // document.getElementById('cancelled').innerHTML = cancelledy + " years, " + cancelledm + " months";
    // document.getElementById('es').innerHTML = "£" + eso;
    // document.getElementById('art').innerHTML = "£" + arto;
    // document.getElementById('artm').innerHTML = "£" + artmo;
    // document.getElementById('inteq').innerHTML = shifo + "%";
}