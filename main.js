var json = { 
    questions: [ 
        {   type: "radiogroup", 
            hasOther: true, 
            isRequired: true, 
            name: "favoritePet", 
            colCount: 2,
            title: "**What is your favorite pet** ?",
            choices: [
                {   
                    value: "dog", 
                    text: "*Dog*" 
                }, 
                {   
                    value: "cat", 
                    text: "**Cat**"
                }, 
                {   
                    value: "parrot",
                    text: "**`Parrot`**"
                } 
            ]
        }
    ],
    completedHtml: "{favoritePet}"
}

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.Survey.cssType = "bootstrap";

var survey = new Survey.Model(json);

survey.onComplete.add(function(result) {
    //document.querySelector('#result').innerHTML = "result: " + JSON.stringify(result.data);
    apiCall(JSON.stringify(result.data));
});

var converter = new showdown.Converter();
survey.onTextMarkdown.add(function(survey, options){
    //convert the mardown text to html
    var str = converter.makeHtml(options.text);
    //remove root paragraphs <p></p>
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    //set html
    options.html = str;
});




var surveyValueChanged = function (sender, options) {
    var el = document.getElementById(options.name);
    if (el) {
        el.value = options.value;
    }
};

apiCall = function($data){
    console.log("$data:");
    console.log($data);
    $.ajax({
        type: "POST",
        headers: {"x-api-key": 'rvdJS9p4up5H6yWWP6VXn925gBQBAHcE38tRHmZT'},
        url: "https://m2zr5ol766.execute-api.us-east-1.amazonaws.com/default/hello-world-python",
        data: $data,

        dataType: 'jsonp',
        success: function(response) {
            console.log("response:");
            console.log(response)
        },
        error:function(html){
            console.log("Error: ");
            console.log(JSON.stringify(html));
        }
    });
}



