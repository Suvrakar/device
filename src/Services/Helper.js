import { constrainPoint } from "@fullcalendar/react";
import dateFormat from "dateformat";
import moment from "moment";
import { format, render, cancel, register } from 'timeago.js';


export const monthSpecifictiemSheetdataFormater = async (data) => {
  const objmaker = (x, idx) => {
    let dd = `${x.date}T${x.check_in[0].time}`
    let dw = x.check_out.length ? `${x.date}T${x.check_out[x.check_out.length - 1].time}` : ""
    let datedd = new Date(dd)
    let dateww = dw !== "" ? new Date(dw) : new Date()
    let pi = dateFormat(datedd, "h:MM TT");
    let po = dateFormat(dateww, "h:MM TT");
    const hours = parseInt(Math.abs(dateww - datedd) / (1000 * 60 * 60) % 24);
    const dif = parseFloat(parseFloat(Math.abs(dateww - datedd) / (1000 * 60 * 60) % 24).toFixed(2));
    const minutes = parseInt(Math.abs(dateww.getTime() - datedd.getTime()) / (1000 * 60) % 60);
    let prod = `${hours}:${minutes} hrs`
    let p = {
      sl: idx,
      date: x.date,
      punch_in: pi,
      punch_out: po,
      remark: x.is_late ? "Late" : "On time",
      production: prod,
      dif: dif
    }
    return p
  }
  return new Array(data.length).fill(null).map((y, idx) => objmaker(data[idx], data.length - idx))

}
export const HolidayDataShaper = async (data) => {
  const objmaker = (x, idx) => {
    let date = new Date(x.date);
    let day = dateFormat(date, 'dddd');
    x.day = day
    return x
  }
  return new Array(data.length).fill(null).map((y, idx) => objmaker(data[idx], data.length - idx))

}

export const makeMonthStatsDataFormater = async (data) => {


  const sectohr = (x) => {
    return parseFloat(parseFloat(x / 3600).toFixed(2))
  }

  const todays_work_hr = () => {
    let work_hr = sectohr(data.today.work_seconds)
    if (data.today.last_activity.activity == "punch_in") {
      let todate = new Date()
      let sDate = dateFormat(todate, "isoDate") + 'T' + data.today.last_activity.time
      let addsec = new Date(sDate).getTime()
      let additional_hr = sectohr((todate.getTime() - addsec) / 1000)
      work_hr = work_hr + additional_hr
    }
    return work_hr
  }

  let today_work_hrs = todays_work_hr();
  let week_work_hrs = sectohr(data.week.work_seconds)
  let month_work_hrs = sectohr(data.month.work_seconds)
  let todayParcentage = (today_work_hrs * 100 / data.today.target).toFixed(1) + "%"
  let weekParcentage = (week_work_hrs * 100 / data.week.target).toFixed(1) + "%"
  let monthParcentage = (month_work_hrs * 100 / data.month.target).toFixed(1) + "%"

  let obj = {
    today_work_hrs,
    week_work_hrs,
    month_work_hrs,
    todayParcentage,
    monthParcentage,
    weekParcentage,
    todayTarget: data.today.target,
    weekTarget: data.week.target,
    monthTarget: data.month.target
  }

  return obj

}

export const chcekPermission = (permission_arr, feature) => {
  return (permission_arr.find((x) => x.includes(`hrms:admin:${feature}`)))
}

export const holidayDataShaper = async (data) => {
  const objmaker = (x, idx) => {
    let date = new Date(x.date);
    let day = dateFormat(date, 'dddd');
    x.day = day
    return x
  }
  return new Array(data.length).fill(null).map((y, idx) => objmaker(data[idx], data.length - idx))

}

export const holidayCsvToJSON = (csv) => {
  var lines = csv.split("\r\n");
  var result = [];
  var headers;
  headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};

    if (lines[i] == undefined || lines[i].trim() == "") {
      continue;
    }

    var words = lines[i].split(",");
    for (var j = 0; j < words.length; j++) {
      obj[headers[j].trim()] = words[j];
    }

    result.push(obj);
  }
  return result
}

export const leaveTypeOptionShaper = async (data) => {
  const objmaker = (x) => {

    let obj = {
      value: x.id,
      label: x.name
    }
    return obj
  }
  let arr = data.filter(x => x.used < x.count);
  return new Array(data.length).fill(null).map((y, idx) => objmaker(arr[idx]))

}
export const leaveDataShaper = async (data) => {
  const objmaker = (x) => {
    let obj = {
      id: x.id,
      leave_type: x.leave_type.name,
      leave_type_id: x.leave_type.id,
      date_from: x.date_from,
      date_to: x.date_to,
      no_of_days: x.no_of_days,
      authority_name: x.approval.modified_by ? x.approval.modified_by.name : "dummy",
      authority_image: x.approval.modified_by ? x.approval.modified_by.image : "",
      authority_id: x.approval.modified_by ? x.approval.modified_by.id : "dummy",
      approval_type: x.approval.approval_type,
      reason: x.reason
    }
    return obj
  }
  return new Array(data.length).fill(null).map((y, idx) => objmaker(data[idx]))

}

export const faltObject = (arr) => {
  const newArr = [];
  arr.map((x) => {

    newArr.push(Object.assign(
      {},
      ...function _flatten(o, prevKey) {
        return [].concat(...Object.keys(o)
          .map(k =>
            typeof o[k] === 'object' ?
              _flatten(o[k], k) : typeof prevKey !== 'undefined' ?
                ({ [`${prevKey}_${k}`]: o[k] }) : ({ [k]: o[k] })
          )
        );
      }(x)
    ))



  })
  return newArr

}





export const arrSorter = (arr, key, order) => {
  return arr.sort((a, b) => {
    var A = typeof a === 'string' ? a[key].toUpperCase() : a[key]; // ignore upper and lowercase
    var B = typeof b === 'string' ? b[key].toUpperCase() : b[key]; // ignore upper and lowercase
    // ignore upper and lowercase
    if (A < B) {
      return order;
    }
    if (A > B) {
      return order * -1;
    }
    return 0
  })
}


export const notification_Mapper = (data) => {

  const time = format(data.created, 'en_US');
  switch (data.type) {
    case 'LEAVE_APPROVED':
      return {
        msg: `Your requested leave hasbeen approved`,
        link: `/hive_hrm/app/employees/leaves-employee`,
        time: time
      }

      break;
    case 'LEAVE_CREATED':
      return {
        msg: `Someone has requested a leave`,
        link: `/hive_hrm/app/employees/leaves-approval`,
        time: time
      }

      break;
    case 'LEAVE_REJECTED':
      return {
        msg: `Your requested leave hasbeen rejected`,
        link: `/hive_hrm/app/employees/leaves-employee`,
        time: time
      }

      break;
    case 'LEAVE_PENDING':
      return {
        msg: `Your requested leave hasbeen set on hold`,
        link: `/hive_hrm/app/employees/leaves-employee`,
        time: time
      }
      break;
    default:
      return {
        msg: ``,
        link: `/hive_hrm/app/general/notifications`,
        time: time
      }
      break;
  }

}

export const DataShaperforExcele = async (dataSet) => {
  let columns = [

    {
      value: "Employee",
      widthPx: 100,
      style: { font: { sz: "24", bold: true } },
    }
  ]


  let data = []
  dataSet[0].attendance.forEach((x, id) => {
    let ii = id + 1
    columns.push({
      value: `${ii}`,
      widthPx: 20,
      style: { font: { sz: "24", bold: true } },
    })
  })
  dataSet.forEach(x => {
    data.push(ObjShaper(x))
  })
  return [{
    columns, data
  }]


}

const ObjShaper = (obj) => {
  let p = [{
    value: obj.employee.name
  }]
  obj.attendance.forEach(x => {
    p.push({
      value: x.isPresent ? `P` : `X`,
      style: { font: { sz: "24", bold: true, color: x.isPresent ? { rgb: "FFF86B00" } : { rgb: "FFFFFF00" } } }
    })
  })
  return p

}