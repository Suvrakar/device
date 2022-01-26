import axios from "axios";


export const getHolidayData = async (token, year) => {
    try {
        let res = await axios.get(`https://timesheet.hivecorelimited.com/holiday/`, {
            params: {
                year: year
            }
            ,
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        return res.data
    } catch (error) {
        return { error }
    }
}

export const addHolidayData = async (token, data) => {
    let body = {
        items: data
    }
    try {
        let res = await axios.post(`https://timesheet.hivecorelimited.com/holiday/`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        return res.data
    } catch (error) {
        return { error }
    }
}

export const updateHolidayData = async (token, data) => {
    try {

        let res = await axios.put(`https://timesheet.hivecorelimited.com/holiday/${data.id}/`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        return res.data
    } catch (error) {
        return { error }
    }
}

export const deleteHolidayData = async (token, data) => {
    try {

        let res = await axios.delete(`https://timesheet.hivecorelimited.com/holiday/${data.id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });
        return res
    } catch (error) {
        return { error }
    }
}


export const getLeaveData = async (token) => {
    try {
      let res = await axios.get(`https://timesheet.hivecorelimited.com/leave/leavetypes/`, {

        headers: {
          'Authorization': `Bearer ${token}`
        }

      });

      return res.data
    } catch (error) {
      return {error}
    }
  }
  export const addLeaveTypeData = async (token, data) => {
    try {
      let res = await axios.post(`https://timesheet.hivecorelimited.com/leave/leavetypes/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });

      return res.data
    } catch (error) {
      return {error}
    }
  }
  export const updateLeaveTypeData = async (token, data) => {
    try {

      let res = await axios.put(`https://timesheet.hivecorelimited.com/leave/leavetypes/${data.id}/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });

      return res.data
    } catch (error) {
      return {error}
    }
  }
  export const deleteLeaveTypeData = async (token, data) => {
    try {

      let res = await axios.delete(`https://timesheet.hivecorelimited.com/leave/leavetypes/${data.id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });
      return res
    } catch (error) {
      return {error}
    }
  }


  export const getShiftData = async (token) => {
    try {
      let res = await axios.get(`https://timesheet.hivecorelimited.com/attendance/admin/shifts/`, {

        headers: {
          'Authorization': `Bearer ${token}`
        }

      });

      return res.data
    } catch (error) {
      return {error}
    }
  }
  export const addShiftData = async (token, data) => {
    try {
      let res = await axios.post(`https://timesheet.hivecorelimited.com/attendance/admin/shifts/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });

      return res.data
    } catch (error) {
      return {error}
    }
  }
  export const updateShiftData = async (token, data) => {
    try {

      let res = await axios.put(`https://timesheet.hivecorelimited.com/attendance/admin/shifts/${data.id}/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });

      return res.data
    } catch (error) {
      return {error}
    }
  }
  export const deleteShiftData = async (token, data) => {
    try {

      let res = await axios.delete(`https://timesheet.hivecorelimited.com/attendance/admin/shifts/${data.id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });
      return res
    } catch (error) {
      return {error}
    }
  }