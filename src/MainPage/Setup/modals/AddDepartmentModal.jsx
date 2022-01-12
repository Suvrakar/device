import React from "react";
import { useForm, Controller } from "react-hook-form";

import Select from "react-select";
const AddDepartmentModal = ({ submitFunction }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const closeEdit = () => {
    setValue("department_name", null);
    setValue("departmenthead", null);
    setValue("reportingdepartment", "");
    setItemId("");
  };

  const onSubmit = (data) => {
    submitFunction(data);
    alert(JSON.stringify(data));
    closeEdit(data);
    reset(data);
  };
  const emplist = [
    { value: "Mr x", label: "Mr x" },
    { value: "Mr z", label: "Mr z" },
    { value: "Mr y", label: "Mr y" },
    { value: "Mr p", label: "Mr p" },
  ];
  const departments = [
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "Admin", label: "Admin" },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  };
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Department</h5>
          <button
            type="button"
            className="close"
            data_dismiss="modal"
            aria-label="Close"
            // onClick={(data) => closeEdit(data)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Department Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                {...register("department_name", { required: true })}
              />
              {errors.department_name && (
                <div style={{ color: "red" , fontSize: "small" }}>is required</div>
              )}
            </div>
            <div className="form-group">
              <label>
                Head of Department <span className="text-danger">*</span>
              </label>
              <Controller
                control={control}
                name="departmenthead"
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
              {errors.departmenthead && (
                <div style={{ color: "red" , fontSize: "small" }}>is required</div>
              )}
            </div>

            <div className="form-group">
              <label>
                Reporting Department <span className="text-danger">*</span>
              </label>

              <Controller
                control={control}
                name="reportingdepartment"
                rules={{ required: true }}
                render={({ field: { onChange, value, name, ref } }) => {
                  return (
                    <Select
                      inputRef={ref}
                      classNamePrefix="select"
                      options={departments}
                      value={departments.find((c) => c.value === value)}
                      onChange={(val) => onChange(val.value)}
                    />
                  );
                }}
              />
              {errors.reportingdepartment && (
                <div style={{ color: "red", fontSize: "small" }}>is required</div>
              )}
            </div>
            <div className="submit-section">
              <button className="btn btn-primary submit-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
