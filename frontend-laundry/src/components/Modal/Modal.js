import React, { useState } from 'react';
import styled from 'styled-components'
import { Button } from '../../globalStyles';
import { ModalSec } from './ModalElements';

const Modal = () => {
    const [showModal, setShowModal] = useState(false);
    
    const openModal= () => {
        setShowModal(prev => !prev);
    };

  return (
    <>
    <ModalSec>
        <Button onClick={openModal}>Tambah Data</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
    </ModalSec>
    </>
  )
}

export default Modal