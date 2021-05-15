saveBtnEls = $('button');

function setRowColors(){
    console.log("Setting Colors");
    //Sets all textAreas to grey
    $('textArea').each(function(){
        $(this).css( "backgroundColor", "grey" );
    });
    
    setInterval(function(){
        $('textArea').each(function(){
            //Each row id corresponds to the row's hour
            var hour = $(this).attr("id").slice(4);
            //stores the current date and hour
            var curDate = moment().format("YYYY-MM-DD HH");
            //stores the current date but uses the row hour instead
            var rowDate = moment().format("YYYY-MM-DD") + " " + hour;
            //If current row is in the future
            if(moment(rowDate).isAfter(curDate,'hour')){
                //Make background green
                $(this).css( "backgroundColor", "green" );
            }
            //If current row is the present
            if(moment(rowDate).isSame(curDate,'hour')){
                //Make background red
                $(this).css( "backgroundColor", "red" );
            }
        });
    },5000);
}

function saveData(){
    console.log("Saving Data");
    var data;
    //retrieves data from local storage
    if(localStorage.getItem('plannerData')){
        data = JSON.parse(localStorage.getItem('plannerData'));
    }
    else{
        data = [];
    }
    //Parse the hour from the clicked button id
    var hour = $(this).attr("id").slice(3);
    //variable uses hour to store corresponding text field with the id
    var text = $('#text' + hour).val();
    //object to store user input
    var toSave = {
        hour: hour,
        text: text
    }
    //finds the index for the corresponding hour data
    var exists = data.findIndex((el) => el.hour == hour);
    //if if finds the correct object, updates the data
    if(exists != -1){
        data[exists] = toSave;
    }
    //if the hour did not have any data, we push to the array
    else{ 
        data.push(toSave);
    }
    //saves to local data
    localStorage.setItem('plannerData', JSON.stringify(data));
}

function loadData(){
    console.log("Loading Data");
    //Get data from local storage
    var data = JSON.parse(localStorage.getItem('plannerData'));
    //If data exists
    if(data){
        //loads data from each element in the data array
        data.forEach(function(rowData){
            //Constructs text id from object hour
            var textBoxId = "#text" + rowData.hour;
            $(textBoxId).val(rowData.text);
        });
    }
}

setRowColors();
loadData();
saveBtnEls.on('click', saveData);