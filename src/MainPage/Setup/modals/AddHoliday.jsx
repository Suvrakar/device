import React from "react";
import { useForm, Controller } from "react-hook-form";

export const AddHoliday = ({submitFunc}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => submitFunc(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>
            Holiday Name <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span style={{ color: "red", fontSize: "small" }}>is required</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Holiday Date <span className="text-danger">*</span>
          </label>
          <div className="cal-icon">
            <input
              className="form-control datetimepicker"
              type="text"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span style={{ color: "red", fontSize: "small" }}>
                is required
              </span>
            )}
          </div>
        </div>
        <div className="submit-section">
          <button className="btn btn-primary submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
