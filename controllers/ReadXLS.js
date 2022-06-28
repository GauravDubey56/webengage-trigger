var XLSX = require("xlsx");
var reader = require("xlsx");
var fs = require('fs');
const fields = []
var validators = {
    name: function (key, err) {

    },
    mobile: function (key, err, obj) {
        if (!key) {
            err.push(`Mobile number not added for ${obj.id}`)
            return false;
        } else {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!regex.test(key)) {
                err.push(`Mobile number format is wrong for ${obj.id}`)
                return false;
            } else return true;
        }
    },
    email: function (key, err, obj) {
        if (!key) {
            err.push(`Email id is not added for ${obj.id}`)
            return false;
        } else {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!regex.test(key)) {
                err.push(`Mobile number format is wrong for ${obj.id}`);
                return false;
            } else return true;
        }

    },
    account: function (key, err, obj) {
        if (!key) {
            err.push(`Account number not added for ${obj.id}`)
            return false;
        } else {
            const regex = /d{9,18}$/
            if (!regex.test(key)) {
                err.push(`Account number format is wrong for ${obj.id}`)
                return false;
            } else return true;
        }
    }

}

function isValid(obj, key, err) {
    if (!obj[key]) {
        err.push(`${key} is not present in ${obj.id}`);
    }
    return obj[key] != undefined;
}
async function readFile(req, res, next) {
    try {
        const file = XLSX.readFile('C:/tempxls/test.xlsx')
        let data = [];
        const sheets = file.SheetNames
        for (let i = 0; i < sheets.length; i++) {
            const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        // Printing data
        console.log(data)
        return res.status(200).json({
            data: data
        })
    } catch (err) {
        return res.status(500).json({
            msg: err
        })
    }
}
function validateData(data, valid_data, invalid_data, err) {
    data.forEach(row => {
        var flag = true
        fields.forEach(feild => {
            if (!isValid(row, feild, err)) {
                flag = false;
            }
        })
        if (flag) {
            valid_data.push(row)
        } else {
            // console.log(err);
            invalid_data.push({ ...row, msg: err.at(-1) });
            console.log(invalid_data)
        }
        console.log(flag);
    })
    console.log('93', invalid_data);
    console.log(err);
}
async function createInvalidSheet(invalid_data, err) {
    console.log('invalid_data', invalid_data);
    const worksheet = reader.utils.json_to_sheet(invalid_data);
    console.log(worksheet)
    const workbook = reader.utils.book_new();
    reader.utils.book_append_sheet(workbook, worksheet, 'data');
    reader.write(workbook, { bookType: "xlsx", type: "buffer" });
    reader.write(workbook, { bookType: "xlsx", type: "binary" });
    reader.writeFile(workbook, "C:/Projects/backend/knexdemo/controllers/errdata.xlsx");
}
async function betterRead(base64) {
    try {

        let workbook = XLSX.read(base64, { type: 'base64' });
        // const workbook = reader.readFile('C:/tempxls/test.xlsx')
        var data = [];
        const err = [];
        const valid_data = []
        var invalid_data = [];
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};

            for (z in worksheet) {
                if (z[0] === '!') continue;
                var tt = 0;
                for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };
                var col = z.substring(0, tt);
                var row = parseInt(z.substring(tt));
                var value = worksheet[z].v;
                if (row == 1 && value) {
                    headers[col] = value;
                    fields.push(value);
                    continue;
                }
                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
        });
        // data.unshift();
        // data.unshift();
        console.log(data);
        validateData(data, valid_data, invalid_data, err)
        createInvalidSheet(invalid_data, err);
        return {
            data: valid_data,
            err: err,
            invalid_data: invalid_data
        }
    } catch (error) {
        console.log(error)
        return {
            err : error,
            success : false
        }
    }
}
fs.readFile('C:/tempxls/test.xlsx', {encoding: "base64"},function(err, data) {
    if (err) throw err;
    console.log(data);
    betterRead(data);
});

// betterRead();
module.exports = { readFile, betterRead };