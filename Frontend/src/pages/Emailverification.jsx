import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Emailverified } from "../Actions/Auth";

const Emailverification = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(Emailverified(params.id, params.token));
    navigate("/Main");
  }, [dispatch, params.id, params.token, navigate]);

  return (
    <div>
      <h2>Email verified</h2>
    </div>
  );
};

export default Emailverification;
