var currentAudit = new Audit(1,1);

$(document).ready(function() {
    var subTotal=0;
    var dollars = $('#colDollars').find('input[type="tel"]');
    var cents = $('#colCoins').find('input[type="tel"]');
    //alert(CreateGUID());

    $('input[type="tel"]').blur(function(){
        CalculateOverShort();
    });

    function calculateTotal(inputBoxes) {
        var total = 0;
        $(inputBoxes).each(function() {
        if(!isNaN(this.value) && this.value.length!=0) {
                total += parseFloat(this.value);
            }
        });
        return total;
    }

    $('#btnInstall').click(function() {
        var installation = navigator.mozApps.install(
            "http://Levia7han.github.com/AuditMaster/manifest.webapp");
        installation.onsuccess = function() {
            $('#btnInstall').hide();
            alert("K.O. Timer has been successfully installed.....");
        }
        installation.onerror = function() {
            alert("APP: The installation FAILED : " + this.error.name);
        }
    });

});

function Audit(csrID,locationID)
{
    var d=new Date();
    this.id=CreateGUID();
    this.CSRId=csrID;
    this.LocationID=locationID;
    this.AuditTime = d.toLocaleTimeString();
    this.AuditDate = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();

    this.Ones=0;
    this.Fives=0;
    this.Tens=0;
    this.Twenties=0;
    this.Fifties=0;
    this.Hundreds=0;

    this.Pennies=0;
    this.Nickles=0;
    this.Dimes=0;
    this.Quarters=0;

    this.StartBank=0;

    this.DrawerTotal=0;
    this.ReportTotal=0;
    this.OverShort=0;

    /*this.CalculateOverShort=CalculateOverShort;
        function CalculateOverShort(me){
           var subTotal =  ones + me.Fives + me.Tens + me.Twenties + me.Fifties + me.Hundreds +
                           me.Pennies + me.Nickles + me.Dimes + me.Quarters;
           var total = subTotal - me.StartBank;
           return total - me.ReportTotal;
        }*/
}

function CalculateOverShort(){
    currentAudit.Ones = $('#ones').val();
    currentAudit.Fives = $('#fives').val();
    currentAudit.Tens = $('#tens').val();
    currentAudit.Twenties = $('#twenties').val();
    currentAudit.Fifties = $('#fifties').val();
    currentAudit.Hundreds = $('#hundreds').val();

    currentAudit.Pennies = roundNumber($('#pennies').val()/100, 2);
    currentAudit.Nickles = roundNumber($('#nickles').val()/100, 2);
    currentAudit.Dimes = roundNumber($('#dimes').val()/100, 2);
    currentAudit.Quarters = roundNumber($('#quarters').val()/100, 2);

    currentAudit.StartBank = roundNumber($('#start_bank').val()/100, 2);
    currentAudit.ReportTotal = roundNumber($('#report_total').val()/100, 2);

    var subTotal =  (($.isNumeric(currentAudit.Ones)) ? parseFloat(currentAudit.Ones) : 0) +
                    (($.isNumeric(currentAudit.Fives)) ? parseFloat(currentAudit.Fives) : 0) +
                    (($.isNumeric(currentAudit.Tens)) ? parseFloat(currentAudit.Tens) : 0) +
                    (($.isNumeric(currentAudit.Twenties)) ? parseFloat(currentAudit.Twenties) : 0) +
                    (($.isNumeric(currentAudit.Fifties)) ? parseFloat(currentAudit.Fifties) : 0) +
                    (($.isNumeric(currentAudit.Hundreds)) ? parseFloat(currentAudit.Hundreds) : 0) +
                    currentAudit.Pennies + currentAudit.Nickles + currentAudit.Dimes + currentAudit.Quarters;
    var total = subTotal - currentAudit.StartBank;
    currentAudit.OverShort = roundNumber(total - currentAudit.ReportTotal,2);

    $('#overShort').text(currentAudit.OverShort);


}

function CreateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function roundNumber(number, digits) {
    var multiple = Math.pow(10, digits);
    return Math.round(number * multiple) / multiple;
}