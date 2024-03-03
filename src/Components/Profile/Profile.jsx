import React from "react";
import styles from './Profile.module.css'
import UpdateUserData from "./UpdateUserData/UpdateUserData";
import UpdateUserPassword from "./UpdateUserPassword/UpdateUserPassword";
import UserAddresses from "./UserAddresses/UserAddresses";
import { Link } from "react-router-dom";
const Profile = () => {

  return (
    <>
      <section>
        {/* <button className="text-main btn border"><Link to='/signin'>Save Changes</Link></button> */}
        <div className="row mt-5">
          <ul className="nav nav-tabs font" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={`nav-link active ${styles.navLink} navLink`} id="user-Data-tab" data-bs-toggle="tab" data-bs-target="#user-Data-tab-pane" type="button" role="tab" aria-controls="user-Data-tab-pane" aria-selected="true">Update User Data</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${styles.navLink}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Update User Password</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${styles.navLink}`} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">User Addresses</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="user-Data-tab-pane" role="tabpanel" aria-labelledby="user-Data-tab" tabIndex="0">
              <UpdateUserData />
            </div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
              <UpdateUserPassword />
            </div>
            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
              <UserAddresses />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;