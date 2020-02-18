function serializeToJson(form){
    var result = {};
    //serializeArray获取到表单中用户输入的内容
    //结果其实是数组[{name:'email',value:'用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function(item){
        result[item.name] = item.value;
    });
    return result;
}