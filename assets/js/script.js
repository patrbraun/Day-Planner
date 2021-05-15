saveBtnEls = $('button');

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
            if(moment(rowDate).isAfter(curDate,'hour')){
                $(this).css( "backgroundColor", "green" );
            }
            if(moment(rowDate).isSame(curDate,'hour')){
                $(this).css( "backgroundColor", "red" );
            }
        });
    },5000);
}

function saveData(){
    var data;
    if(localStorage.getItem('plannerData')){
        data = JSON.parse(localStorage.getItem('plannerData'));
    }
    else{
        data = [];
    }

    var hour = $(this).attr("id").slice(3);
    console.log("Saving: " + hour);
    var text = $('#text' + hour).val();
    console.log(text);

    var toSave = {
        hour: hour,
        text: text
    }
    console.log(toSave.hour);
    var exists = data.findIndex((el) => el.hour == hour);
    console.log(exists);
    if(exists != -1){
        data[exists] = toSave;
    }
    else{ 
        data.push(toSave);
    }


    localStorage.setItem('plannerData', JSON.stringify(data));
}

setRowColors();
saveBtnEls.on('click', saveData);