import React from "react";
import axios from "axios";
import { Navbar, Table } from "../../components";
import { Modal, Form } from "react-bootstrap";
import { Container, Button, ButtonSm, ContainerSm } from '../../globalStyles';
import { TableObjFour } from "./Data";
import {Tabel, Thead, Tr, Th, Td} from '../../components/Table/TableElements'

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            outlet: [],
            id_user: "",
            nama:"",
            username: "",
            password: "",
            id_outlet: "",
            role: "",
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === "admin") {
              this.state.role = localStorage.getItem('role')
              this.state.token = localStorage.getItem('token')
              this.state.userName = localStorage.getItem('name')
            } else {
              window.alert("You are not an admin")
              window.location = '/login'
            }
          } 
          else {
            window.location = "/login"
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

    getUser = () => {
        let user = (localStorage.getItem("nama"))
        let url = "http://localhost:8080/user"
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.user,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(user)
    }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet"

        axios.get(url)
        
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

    addUser = () => {
        this.setState({
            isModalOpen: true,
            id_user: "",
            nama:"",
            username: "",
            password: "",
            id_outlet: "",
            role: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_user: item.id_user,
            nama: item.nama,
            username: item.username,
            password: item.password,
            id_outlet: item.id_outlet,
            role: item.role,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  {
        id_user: this.state.id_user,
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        id_outlet: this.state.id_outlet,
        role: this.state.role
        }
       
        let url = "http://localhost:8080/user"
        if (this.state.action === "insert"){
            axios.post(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getUser()
                this.handleClose()
            })
            .catch(error => console.log(error))

            }else if (this.state.action === "update") {
            url = "http://localhost:8080/user/" + this.state.id_user
            axios.put(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getUser()
                this.handleClose()
            })
            .catch(error => console.log(error))
        }
    }

    handleDel = (id_user) => {
        let url = "http://localhost:8080/user/" + id_user
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getUser()
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
            let tempUser = this.state.user
            let result = tempUser.filter(item => {
                return item.nama.toLowerCase().includes(keyword) ||
                item.role.toLowerCase().includes(keyword) 

            })
            this.setState({user: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getUser()
        this.getOutlet()
    }

    render() {
        return (
          <Container>
            <Navbar />
            <Table {...TableObjFour} />
            <ContainerSm>
            <input type="text" className="form-control my-2" placeholder="Pencarian"
                            value={this.state.keyword}
                            onChange={ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            />
            </ContainerSm>
             <Tabel>
            <Thead>
              <Tr>
                 <Th>Id User</Th>
                 <Th>Nama</Th>
                 <Th>Username</Th>
                 {/* <Th>Password</Th> */}
                 <Th>Id Outlet</Th>
                 <Th>Role</Th>
                 <Th>Option</Th>
              </Tr>
            </Thead>
            <tbody>
              {this.state.user.map((item,index) => {
                return (
                <Tr key={index}>
                  <Td>{item.id_user}</Td>
                  <Td>{item.nama}</Td>
                  <Td>{item.username}</Td>
                  {/* <Td>{item.password}</Td> */}
                  <Td>{item.id_outlet}</Td>
                  <Td>{item.role}</Td>
                  <Td>

                  <ButtonSm secondary onClick={this.props.onEdit}>Edit</ButtonSm>|
                    <ButtonSm onClick={this.props.onDel}>Hapus</ButtonSm>
                                      </Td>
                                  </Tr>
                              );
                          })}
                      </tbody>
                  </Tabel>
                  <br/>
                  <Button primary onClick={this.addUser}>Tambah Data</Button>
                        <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form User</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                            <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Nama</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3 text-dark bg-transparent" controlId="username">
                                    <Form.Label className="text-black" >Username </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan Username" value={this.state.username} onChange={this.handleChange} />
                             </Form.Group>
                             <Form.Group className="mb-3 text-dark bg-transparent" controlId="password">
                                    <Form.Label className="text-black" >Password </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="password" placeholder="Masukkan Password" value={this.state.password} onChange={this.handleChange} />
                             </Form.Group>
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
                                <Form.Label className="text-black" >Role</Form.Label>
                                <Form.Select id="mySelect"name="role" value={this.state.role} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                </Form.Select>
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