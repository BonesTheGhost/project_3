import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

import './PlaceItem.css';

const PlaceItem = props => {
    const [showMap, setShowMap] = useState(false);
    //state that handles whether we are showing the confirmation modal or not for deletion
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteWarningHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteWarningHandler = () => {
        setShowConfirmModal(false);
        console.log("DELETING!!!")
    };

    return (
        <React.Fragment>
            <Modal 
            show={showMap} 
            onCancel={closeMapHandler} 
            header={props.address} 
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE MAP</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal show={showConfirmModal} onCancel={cancelDeleteWarningHandler} header="Are you sure?" footerClass="place-item__modal-actions" footer={
                <React.Fragment>
                    <Button inverse onCLick={cancelDeleteWarningHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteWarningHandler}>DELETE</Button>
                </React.Fragment>
            }>
                <p>Do you really want to delete this place? /!\WARNING/!\ This CANNOT be undone!!</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;