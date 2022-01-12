import axios from "axios";
import { monthSpecifictiemSheetdataFormater } from "./Helper";


export const getAllDevices = async (token) => {


    try {
        let res = await axios.get('http://192.168.50.251:8000/devices',
            // {
            //     // headers: {
            //     //     'Authorization': `Bearer ${token}`
            //     // }

            // }
            )
        return res.data
    } catch (error) {
        return { error }
    }

}

export const punchTimeLog = async (type, token) => {
    let url = type === 'in' ? '/attendance/punchin/' : type === 'out' ? '/attendance/punchout/' : ''
    if (url == '') return
    try {
        let res = await axios.post(`https://timesheet.hivecorelimited.com${url}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
        return res.data
    } catch (error) {
        return { error }

    }

}

export const getCurrentMonthtats = async (token) => {

    try {
        let res = await axios.get(`https://timesheet.hivecorelimited.com/attendance/statistics/`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })


        return res.data
    } catch (error) {



        return { error }

    }

}

export const getMothSpecificUserTimeSheet = async (month, year, token, id) => {

    try {
        let res = id ? await axios.get(`https://timesheet.hivecorelimited.com/attendance/timesheets/`,
            {
                params: {
                    month,
                    year,
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            }) : await axios.get(`https://timesheet.hivecorelimited.com/attendance/timesheets/`,
                {
                    params: {
                        month,
                        year
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }

                })
        if (res.data.length === 0) return res.data
        let dataArr = await monthSpecifictiemSheetdataFormater(res.data)
        return dataArr
    } catch (error) {



        return { error }

    }

}

export const getEmployeeList = async (token) => {

    try {
        let res = await axios.get('https://sso.hivecorelimited.com/users',
            {

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })

        return res.data
    } catch (error) {
        return { error }

    }

}

export const getAllDesignations = async (token) => {

    try {
        let res = await axios.get('https://sso.hivecorelimited.com/designations', {

            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        return res.data
    } catch (error) {
        return { error }


    }

}

export const searchEmployee = async (params, token) => {

    try {
        let res = await axios.get('https://sso.hivecorelimited.com/users',

            {
                params: params,
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            }
        )
        return res.data
    } catch (error) {
        return { error }

    }

}

export const getLeaveTypeCount = async (token) => {
    try {
        let res = await axios.get('https://timesheet.hivecorelimited.com/leave/leavetypes/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data

    } catch (error) {
        return { error }

    }
}
export const getLeavesToApproveCountforEmp = async (token) => {
    try {
        let res = await axios.get('https://timesheet.hivecorelimited.com/leave/pendingleaves/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data

    } catch (error) {
        return { error }

    }
}

export const postLeavefromEmployeeEnd = async (body, token) => {

    try {
        let res = await axios.post('https://timesheet.hivecorelimited.com/leave/leaveforms/', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return { error }

    }
}
export const updateLeavefromdata = async (body, token) => {

    try {

        let res = await axios.put(`https://timesheet.hivecorelimited.com/leave/leaveforms/${body.id}/`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return { error }

    }
}
export const updateLeavefromdecision = async (body, token) => {

    try {

        let res = await axios.put(`https://timesheet.hivecorelimited.com/leave/leaveapproval/${body.id}/`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return { error }

    }
}
export const getLeaveforEmployeeEnd = async (token) => {
    try {

        let res = await axios.get('https://timesheet.hivecorelimited.com/leave/leaveforms/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return { error }

    }
}
export const getLeaveforApprovalEnd = async (token) => {
    try {

        let res = await axios.get('https://timesheet.hivecorelimited.com/leave/leaveapproval/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return { error }

    }
}
export const deleteLeaveforEmployeeEnd = async (id, token) => {
    try {

        let res = await axios.delete(`https://timesheet.hivecorelimited.com/leave/leaveforms/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return { error }

    }
}
