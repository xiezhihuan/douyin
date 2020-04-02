function inputString2File(str){
     fs.appendFile("./resultData.html", str, (err, data) => {
          if (err) throw err
     });
}

module.exports = inputString2File;