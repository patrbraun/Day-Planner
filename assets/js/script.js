function setRowColors(){
    $('textArea').each(function(){
        $(this).css( "backgroundColor", "grey" );
    });
    
    setInterval(function(){
        $('textArea').each(function(){
            //Each row id corresponds to the row's hour
            var hour = $(this).attr("id").slice(4);
            var curDate = moment().format("YYYY-MM-DD HH");
            var rowDate = moment().format("YYYY-MM-DD") + " " + hour;
            console.log(curDate);
            console.log(rowDate);
            if(moment(rowDate).isAfter(curDate,'hour')){
                $(this).css( "backgroundColor", "green" );
            }
            if(moment(rowDate).isSame(curDate,'hour')){
                $(this).css( "backgroundColor", "red" );
            }
        });
    },5000);
}

setRowColors();
