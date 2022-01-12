import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

export const AddLeave = ({ submitFunction }) => {
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setValue("name", "");
    setValue("count", "");
  }, []);
  const onSubmit = (data) => {
    submitFunction(data);
  };
  return (
   
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Leave Type <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                {...register("name", { required: true })}
              />
                      {errors.name && (
                <span style={{ color: "red", fontSize: "small" }}>
                  is required
                </span>
              )}
            </div>
    
            <div className="form-group">
              <label>
                Number of days <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                {...register("count", { required: true })}
              />
                    {errors.count && (
                <span style={{ color: "red", fontSize: "small" }}>
                  is required
                </span>
              )}
            </div>
            <div className="submit-section">
              <button className="btn btn-primary submit-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
     
  );
};
