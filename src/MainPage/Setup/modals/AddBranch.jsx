import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

export const AddBranch = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  const emplist = [
    { value: "mr.x", label: "mr.x" },
    { value: "mr.y", label: "mr.y" },
    { value: "mr.z", label: "mr.z" },
    { value: "mr.k", label: "mr.k" },
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>
            Branch Name <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            {...register("branch_name", { required: true })}
          />
        {errors.branch_name && <span style={{color: "red", fontSize: "small"}}>is required</span>}
        </div>
        
        <div className="form-group">
          <label>
            Address <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            {...register("address", { required: true })}
          />
        {errors.branch_name && <span style={{color: "red", fontSize: "small"}}>is required</span>}
        </div>

        <div className="form-group">
          <label>
            Branch Manager <span className="text-danger">*</span>
          </label>
          <Controller
            control={control}
            name="department"
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref } }) => {
              return (
                <Select
                  inputRef={ref}
                  classNamePrefix="select"
                  options={emplist}
                  value={emplist.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                />
              );
            }}
          />
        {errors.branch_name && <span style={{color: "red", fontSize: "small"}}>is required</span>}
        </div>
        <div className="submit-section">
          <button className="btn btn-primary submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};
