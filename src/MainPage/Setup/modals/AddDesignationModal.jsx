import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const AddDesignationModal = ({ SubmitFunc }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => {
    SubmitFunc(data);
    alert(JSON.stringify(data));
  };

  const departments = [
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "Admin", label: "Admin" },
  ];
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Designation</h5>
          <button
            type="button"
            className="close"
            data_dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Designation <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                {...register("designation_name", { required: true })}
              />
              {errors.designation_name && (
                <span style={{ color: "red", fontSize: "small" }}>
                  is required
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                Department <span className="text-danger">*</span>
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
                      options={departments}
                      value={departments.find((c) => c.value === value)}
                      onChange={(val) => onChange(val.value)}
                    />
                  );
                }}
              />
              {errors.designation_name && (
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
        </div>
      </div>
    </div>
  );
};

export default AddDesignationModal;
