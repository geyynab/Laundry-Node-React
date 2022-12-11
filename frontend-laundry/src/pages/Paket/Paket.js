import React from "react";
import axios from "axios";
import { Table } from "../../components";
import {  Button } from '../../globalStyles'
import { Modal, Form } from "react-bootstrap";
import PaketList from './PaketList';
import { ContainerSm, Container } from "../../globalStyles";
import { TableObjThree } from "./Data";
import NavbarOwner from '../../components/Navbar/NavbarOwner'
import Navbar from '../../components/Navbar/Navbar'
import NavbarKasir from '../../components/Navbar/NavbarKasir'

export default class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            paket: [],
            outlet: [],
            id_paket: "",
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: 0,
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
              this.state.role = localStorage.getItem('role')
              this.state.token = localStorage.getItem('token')
              this.state.userName = localStorage.getItem('name')
              this.state.outletname = localStorage.getItem('outlet')
              this.state.outletid = localStorage.getItem('id_outlet')
            } else {
              window.alert("You are not an admin")
              window.location = '/login'
            }
          } else {
            window.location = "/login"
          }
        }

    handleChoose = (selectedItem) => {
        if (localStorage.getItem("id_member") !== null) {
          let tempCart = []
    
          if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
          }
    
          // cek data yang dipilih user ke keranjang belanja
          let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
          if (existItem) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`You have choose ${selectedItem.nama_paket} package`)
          }
          else {
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
            if (promptJumlah !== null && promptJumlah !== "") {
              // jika user memasukkan jumlah item yang dibeli
              // menambahkan properti "jumlahBeli" pada item yang dipilih
              selectedItem.qty = promptJumlah
              selectedItem.subtotal = promptJumlah * selectedItem.harga
              // masukkan item yang dipilih ke dalam cart
              tempCart.push(selectedItem)
              // simpan array tempCart ke localStorage
              localStorage.setItem("cart", JSON.stringify(tempCart))
            }
          }
    
    
    
        } else {
          window.alert("Choose Member First!!")
          window.location = '/memberchoose'
        }
      }

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getPaket = () => {
        let paket = (localStorage.getItem("nama_paket"))
        let url = "http://localhost:8080/paket"
        axios.get(url)
            .then(res => {
                this.setState({
                    paket: res.data.paket,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(paket)
    }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet"

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    outlet: res.data.outlet,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    addPaket = () => {
        this.setState({
            isModalOpen: true,
            id_paket: "",
            id_outlet:"",
            jenis: "",
            nama_paket: "",
            harga: 0,
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_paket: item.id_paket,
            id_outlet: item.id_outlet,
            jenis: item.jenis,
            nama_paket: item.nama_paket,
            harga: item.harga,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  {
        id_paket: this.state.id_paket,
        id_outlet: this.state.id_outlet,
        jenis: this.state.jenis,
        nama_paket: this.state.nama_paket,
        harga: this.state.harga
        }
       
        let url = "http://localhost:8080/paket"
        if (this.state.action === "insert"){
            axios.post(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getPaket()
                this.handleClose()
            })
            .catch(error => console.log(error))

            }else if (this.state.action === "update") {
            url = "http://localhost:8080/paket/" + this.state.id_paket
            axios.put(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getPaket()
                this.handleClose()
            })
            .catch(error => console.log(error))
        }
    }

    handleDel = (id_paket) => {
        let url = "http://localhost:8080/paket/" + id_paket
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempPaket = this.state.paket
            let result = tempPaket.filter(item => {
                return item.nama_paket.toLowerCase().includes(keyword) ||
                item.jenis.toLowerCase().includes(keyword) 

            })
            this.setState({paket: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getPaket()
        this.getOutlet()
    }

    render() {
        return (
          <Container>
        {this.state.role == "kasir" && <NavbarKasir />}
          {this.state.role == "owner" && <NavbarOwner />}
          {this.state.role == "admin" && <Navbar />}
            <Table {...TableObjThree} />
            <ContainerSm>
            <input type="text" className="form-control my-2" placeholder="Pencarian"
                            value={this.state.keyword}
                            onChange={ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            />
            </ContainerSm>
            {this.state.paket.map((item, index) => {
                            return (
                                <PaketList key={index}
                                    
                                    jenis={item.jenis}
                                    id_outlet={item.id_outlet}
                                    nama_paket={item.nama_paket}
                                    harga={item.harga}
                                    onEdit={() => this.handleEdit(item)}
                                    onDel={() => this.handleDel(item.id_paket)}
                                    onChoose={() => this.handleChoose(item)}

                                />
                            )
                        })}
                        <Button primary onClick={() => this.addPaket()}>Tambah Data</Button>
                        <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Paket</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>

                                    <Form.Group className="mb-3" controlId="id_outlet">
                                    <Form.Label className="text-black">Outlet</Form.Label>
                                    <Form.Select id="mySelect" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })} required>
                                    <option className="opsitransacd ksi" value="" readOnly={true} hidden={true}>
                                        Pilih outlet
                                    </option>
                                    {this.state.outlet.map((outlet) => (
                                        <option value={outlet.id_outlet}>{outlet.nama}</option>
                                    ))}
                                    </Form.Select>
                                </Form.Group>

                               
                                <Form.Group  className="mb-3">
                                <Form.Label className="text-black" >Jenis Paket</Form.Label>
                                <Form.Select id="mySelect"name="jenis" value={this.state.jenis} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Jenis Paket
                                    </option>
                                    <option value="kiloan">Kiloan</option>
                                    <option value="selimut">Selimut</option>
                                    <option value="bed_cover">Bed Cover</option>
                                    <option value="kaos">Kaos</option>
                                    <option value="kain">Kain</option>
                                </Form.Select>
                                </Form.Group>
                                
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama_paket">
                                    <Form.Label className="text-black" >Nama Paket </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama_paket" placeholder="Masukkan Nama Paket" value={this.state.nama_paket} onChange={this.handleChange} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="jenis">
                                    <Form.Label className="text-black">Jenis</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="jenis" placeholder="Masukkan Jenis" value={this.state.jenis} onChange={this.handleChange} />
                                </Form.Group> */}
                                
                                <Form.Group className="mb-3" controlId="harga">
                                    <Form.Label className="text-black">Harga</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="harga" placeholder="Masukkan Harga" value={this.state.harga} onChange={this.handleChange} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button primary type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
          </Container>
        )
    }

}