import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiFillPrinter } from 'react-icons/ai';
import { Badge} from 'react-bootstrap';
import NavbarOwner from '../../components/Navbar/NavbarOwner'
import Navbar from '../../components/Navbar/Navbar'
import NavbarKasir from '../../components/Navbar/NavbarKasir'
import { Container } from '../../globalStyles';
import { Tabel, Td, Tr } from '../../components/Table/TableElements';

class DetailTransaksi extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
            isModalOpen: false,
            token: "",
            id_outlet: 0,
            search: "",
            userName: "",
            isModalPw: false,
            action: "",
            outletName: "",
            id_transaksi: 0,
            member: [],
            outlet: [],
            detail_transaksi: [],
            user: []
    }
    if (localStorage.getItem('token')) {
      // if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
        this.state.id_transaksi = localStorage.getItem('id_transaksi')
        this.state.id_outlet = localStorage.getItem('id_outlet')
      // } else {
      //   window.alert("You are not an admin")
      //   window.location = '/login'
      // }
    } 
    // else {
    //   window.location = "/login"
    // }
  }

  getTransaksi = () => {
    let url = `http://localhost:8080/transaksi/byTransaksi/` + this.state.id_transaksi + '/' + this.state.id_outlet
    axios.get(url)
        .then(res => {
            this.setState({
                transaksi: res.data.transaksi,
                member: res.data.transaksi.member,
                outlet: res.data.transaksi.outlet,
                user: res.data.transaksi.user,
                detail_transaksi: res.data.transaksi.detail_transaksi
            })
            console.log(this.state.outlet)
            console.log(this.state.detail_transaksi)
        })
        .catch(error => {
            console.log(error)
        })
}

convertTime = (time) => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
}

componentDidMount() {
    this.getTransaksi()
}

  print(){
    window.print();
  }

  render() {
    return (
      <Container>
        {this.state.role == "owner" && <NavbarOwner />}
        {this.state.role == "admin" && <Navbar />}
        {this.state.role == "kasir" && <NavbarKasir />}
        <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-2">
                <span className="display-6">Laporan Data Detail Transaksi</span>
            </h4>
                <br></br>
          <div className="row">
            <div>
      
            <Tabel>
              <tbody>	
                <Tr>
                  <Td>Invoice Code</Td>
									<Td>{this.state.transaksi.kode_invoice}</Td>
								</Tr>
                <Tr>
                  <Td>Outlet Name</Td>
									<Td>{this.state.outlet.nama}</Td>
								</Tr>
								<Tr>
                  <Td>Member Name</Td>
									<Td>{this.state.member.nama}</Td>
								</Tr>
								<Tr>
                  <Td>Address Member</Td>
									<Td>{this.state.member.alamat}</Td>
								</Tr>
								<Tr>
                  <Td>Gender</Td>
                  <Td>{this.state.member.jenis_kelamin}</Td>
								</Tr>
                <Tr>
                  <Td>No Telp.</Td>
									<Td>{this.state.member.tlp}</Td>
								</Tr>
                <Tr>
                  <Td>Order Date</Td>
									<Td>{this.convertTime(this.state.transaksi.tgl)}</Td>
								</Tr>
								<Tr>
                  <Td>Order Status</Td>
									<Td>{this.state.transaksi.status}</Td>
									</Tr>
                  <Tr>
                    <Td>Payment Date</Td>
										<Td>{this.state.transaksi.tgl_bayar}</Td>
									</Tr>
									<Tr>
                    <Td>Payment Status</Td>
										<Td>{this.state.transaksi.dibayar}</Td>
									</Tr>
                  <Tr>
                    <Td>Deadline</Td>
										<Td>{this.convertTime(this.state.transaksi.batas_waktu)}</Td>
									</Tr>
                  <Tr>
                    <Td>User Name</Td>
										<Td>{this.state.user.nama} ({this.state.user.role})</Td>
									</Tr>
		 							</tbody>
									</Tabel>

                                    <br></br><br></br>
                                    <table className="table table-bordered text-black">
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.detail_transaksi.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.paket.nama_paket}</td>
                                    <td>Rp {item.paket.harga}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-right">Rp { item.paket.harga * item.qty } </td>

                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3">Discount 5%</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.diskon}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Pajak 10%</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.pajak}</td>
                            </tr>
                            
                            <tr>
                                <td colSpan="3">Biaya Tambahan</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.biaya_tambahan}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="align-self-end">Initial Total</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.total}</td>
                            </tr>

                        </tbody>
                    </table>
                                                    <br></br><br></br>
                    
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    {/* <NavLink to="/transaksi"><button className='btn btn-dark m-1' id="blue">Back</button></NavLink> */}
                   
                    {/* <button target="_blank" className='btn btn-primary btn-lg w-30' id="blue"><AiFillPrinter /> Print</button> */}
                    <button className="btn btn-primary m-1" onClick={() => this.print()}>
                     Print
                     </button>
                                </div>
            </div>
          </div>
      </Container>
    );
  }
}

export default DetailTransaksi;