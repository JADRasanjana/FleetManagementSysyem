import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

export default function AddCorrectiveMaintenance() {
  const [jobID, setJobID] = useState("");
  const [DID, setDID] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [Date_report, setDateReport] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [parts_used, setPartsUsed] = useState("");
  const [Date_complete, setDateComplete] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCurrentLocation();
  }, []);

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function handleMapClick(event) {
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  }

  function validateForm() {
    const errors = {};

    if (!jobID) {
      errors.jobID = "Job ID is required";
    }

    if (!DID) {
      errors.DID = "Driver ID is required";
    }

    if (!vehicleNo) {
      errors.vehicleNo = "Vehicle Number is required";
    } else if (!/^([A-Z0-9]{2,3}-[A-Z0-9]{1,5})?$/.test(vehicleNo)) {
      errors.vehicleNo = "Invalid vehicle number format";
    }

    if (!Date_report) {
      errors.Date_report = "Date Report is required";
    }

    if (!priority) {
      errors.priority = "Priority is required";
    }

    if (!description) {
      errors.description = "Description is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newCorrectiveMaintenance = {
        jobID,
        DID,
        vehicleNo,
        Date_report,
        priority,
        description,
        parts_used,
        Date_complete,
        latitude,
        longitude,
      };

      axios
        .post("http://localhost:8411/corrective/add", newCorrectiveMaintenance)
        .then((response) => {
          alert(response.data);
          alert("Corrective Maintenance Successfully Added");
          window.location.href = "/maintenance";

          // Reset form fields
          setJobID("");
          setDID("");
          setVehicleNo("");
          setDateReport("");
          setPriority("");
          setDescription("");
          setPartsUsed("");
          setDateComplete("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="container">
      <h1>Add Corrective Maintenance</h1>
      <form onSubmit={sendData}>
        {errors.jobID && (
          <div className="alert alert-danger">{errors.jobID}</div>
        )}
        <div className="form-group">
          <label htmlFor="jobID">Job ID</label>
          <input
            type="text"
            className={`form-control ${errors.jobID ? "is-invalid" : ""}`}
            id="jobID"
            placeholder="Enter Job ID"
            value={jobID}
            onChange={(e) => {
              setJobID(e.target.value);
              setErrors({ ...errors, jobID: null });
            }}
          />
        </div>

        {errors.DID && (
          <div className="alert alert-danger">{errors.DID}</div>
        )}
        <div className="form-group">
          <label htmlFor="DID">Driver ID</label>
          <input
            type="text"
            className={`form-control ${errors.DID ? "is-invalid" : ""}`}
            id="Driver ID"
            placeholder="Enter Driver ID"
            value={DID}
            onChange={(e) => {
              setDID(e.target.value);
              setErrors({ ...errors, DID: null });
            }}
          />
        </div>

        {errors.vehicleNo && (
          <div className="alert alert-danger">{errors.vehicleNo}</div>
        )}
        <div className="form-group">
          <label htmlFor="vehicleNo">Vehicle Number</label>
          <input
            type="text"
            className={`form-control ${errors.vehicleNo ? "is-invalid" : ""}`}
            id="vehicleNo"
            placeholder="Enter Vehicle Number"
            value={vehicleNo}
            onChange={(e) => {
              setVehicleNo(e.target.value);
              setErrors({ ...errors, vehicleNo: null });
            }}
          />
        </div>

        {errors.Date_report && (
          <div className="alert alert-danger">{errors.Date_report}</div>
        )}
        <div className="form-group">
          <label htmlFor="Date_report">Date Report</label>
          <input
            type="date"
            className={`form-control ${errors.Date_report ? "is-invalid" : ""}`}
            id="Date_report"
            placeholder="Enter Date Report"
            value={Date_report}
            onChange={(e) => {
              setDateReport(e.target.value);
              setErrors({ ...errors, Date_report: null });
            }}
          />
        </div>

        {errors.priority && (
          <div className="alert alert-danger">{errors.priority}</div>
        )}
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            className={`form-control ${errors.priority ? "is-invalid" : ""}`}
            id="priority"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setErrors({ ...errors, priority: null });
            }}
          >
            <option value="">Select Priority</option>
            <option value="Low Priority">Low Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="High Priority">High Priority</option>
          </select>
        </div>

        {errors.description && (
          <div className="alert alert-danger">{errors.description}</div>
        )}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: null });
            }}
          />
       

        </div>
        <h2>Select Location</h2>
        {
          latitude && longitude && (
            <LoadScript googleMapsApiKey="AIzaSyAz27qe4QY9J6XxL_8VmOW4AiA8xr4uuUU">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: latitude, lng: longitude }} // use state values
                zoom={19}
                onClick={handleMapClick}
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </LoadScript>
          )
        }


        {/* {errors.parts_used && (
          <div className="alert alert-danger">{errors.parts_used}</div>
        )}
        <div className="form-group">
          <label htmlFor="parts_used">Parts Used</label>
          <input
            type="text"
            className={`form-control ${errors.parts_used ? "is-invalid" : ""}`}
            id="parts_used"
            placeholder="Enter Parts Used"
            value={parts_used}
            onChange={(e) => {
              setPartsUsed(e.target.value);
              setErrors({ ...errors, parts_used: null });
            }}
          />
        </div> */}

        {/* {errors.Date_complete && (
          <div className="alert alert-danger">{errors.Date_complete}</div>
        )}
        <div className="form-group">
          <label htmlFor="Date_complete">Date Complete</label>
          <input
            type="date" // Use input type "date" for date input
            className={`form-control ${errors.Date_complete ? "is-invalid" : ""}`}
            id="Date_complete"
            placeholder="Enter Date Complete"
            value={Date_complete}
            onChange={(e) => {
              setDateComplete(e.target.value);
              setErrors({ ...errors, Date_complete: null });
            }}
          />
        </div> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

