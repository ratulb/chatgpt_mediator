import React, { useState, useEffect } from 'react';
import SettingsSaveButton from "../../../buttons/SettingsSaveButton";
import SettingsCancelButton from "../../../buttons/SettingsCancelButton";
import {
    setUserPreferredStore, getUserPreferredStore
} from "../../../common";

const StoragePreferences = ({ id, activeTab, cancel }) => {
    const saveStorageSettings = (e) => {
        e.preventDefault();
        setUserPreferredStore(storeType);
    }
    const [storeType, setStoreType] = useState(getUserPreferredStore());
   
    return (
        activeTab === id ? <div id="storage">
            <div className="settings_container">
                <form id="store_setting_form">
                    <div className="row">
                        <label htmlFor="datastore">Data store</label>
                        <select name="datastore" value={storeType} onChange={(e) => setStoreType(e.target.value)}>
                            <option value="sessionStorage">Session</option>
                            <option value="localStorage">Local storage</option>
                        </select>
                    </div>
                    <div className="row">
                        <SettingsCancelButton marginLeft="0" onClickHandler={cancel} direction="right" />
                        <SettingsSaveButton onClickHandler={saveStorageSettings} direction="right" />
                    </div>
                </form>
            </div>
        </div>
            : null
    );
};

export default StoragePreferences;