import React, { useState, useEffect } from "react";

import "../../antdstyle.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import moment from "moment";

const AddLeaveEmployee = ({ submitFunction, leaveTypes }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm();


  const onSubmit = (data) => {
    const startTime = getValues("from_time");
    const endTime = getValues("to_time");
    if (startTime >= endTime) {
      alert("Start Time can not be larger than End Time")

    } else {
      submitFunction(data);
    }
  }


  const [startDay, setStart] = useState();
  const [endDay, setEnd] = useState();
  useEffect(() => {
    setValue("no_of_days", 0);
    setValue("date_from", "");
    setValue("date_to", "");
    setStart(null);
    setEnd(null);
    setValue("reason", "");
    setValue("leave_type", '');

  }, []);

  useEffect(() => {
    if (startDay && endDay) {
      let b = moment(endDay).diff(moment(startDay), "days") + 1;

      setValue("no_of_days", b);
    } else setValue("no_of_days", 0);
  }, [startDay, endDay]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>
          Leave Type <span className="text-danger">*</span>
        </label>
        <Controller
          control={control}
          name="leave_type"
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => {
            return (
              <Select
                classNamePrefix="select"
                options={leaveTypes}
                value={leaveTypes.find((c) => c.value === value)}
                onChange={(val) => onChange(val.value)}
              />
            );
          }}
        />
        {errors.leave_type && <span style={{ color: "red", fontSize: "small" }}>is required</span>}
      </div>
      <div className="form-group">
        <label>
          From <span className="text-danger">*</span>
        </label>
        <input
          className="form-control datetimepicker"
          type="date"
          {...register("date_from", {
            required: true,
            onChange: (e) => {
              e.persist();
              setStart(e.target.value);
              if (e) setValue("date_from", e.target.value);
              else setValue("date_from", null);
            },
          })}
        />
        {errors.date_from && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

      </div>
      <div className="form-group">
        <label>
          To <span className="text-danger">*</span>
        </label>
        <input
          className="form-control datetimepicker"
          type="date"
          {...register("date_to", {
            required: true,
            onChange: (e) => {
              e.persist();
              setEnd(e.target.value);
              if (e.target.value) setValue("date_to", e.target.value);
              else setValue("date_to", null);
            },

          })}
        />
        {errors.date_to && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

      </div>
      <div className="form-group">
        <label>
          Number of days <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          readOnly
          type="number"
          {...register("no_of_days", { required: true })}
        />
      </div>
      <div className="form-group">
        <label>
          Remaining Leaves <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          readOnly
          defaultValue={12}
          type="text"
        />
      </div>
      <div className="form-group">
        <label>
          Leave Reason <span className="text-danger">*</span>
        </label>
        <textarea
          rows={4}
          className="form-control"
          defaultValue={""}
          {...register("reason", { required: true })}
        />
        {errors.reason && <span style={{ color: "red", fontSize: "small" }}>is required</span>}
      </div>
      <div className="submit-section">
        <button className="btn btn-primary submit-btn">Submit</button>
      </div>
    </form>
  );
};

export default AddLeaveEmployee;
