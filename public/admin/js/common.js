//表单提取信息方法
function serializeToJson(form){
    let result = {};
    //serializeArray()是jQuery的方法，返回一个包含表单信息的数组
    //[{name: email, value: '用户输入的密码'}，{……}]
    let f = form.serializeArray();
    f.forEach(function(item){
        result[item.name]=item.value;
    });
    return result;
};