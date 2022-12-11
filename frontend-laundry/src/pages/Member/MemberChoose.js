import React, { Component } from 'react';
import { TableObjTwo } from './Data';
import { Table } from '../../components';
import { Container, Button, ButtonSm, ContainerSm } from '../../globalStyles';
import $ from 'jquery';
import axios from 'axios';
import {Tabel, Thead, Tr, Th, Td} from '../../components/Table/TableElements';
import NavbarKasir from '../../components/Navbar/NavbarKasir'


class Member extends React.Component {  
  constructor() {
      super();
      this.state = {
          member: [], //array pegawai untuk menampung data pegawai
          id_member: 0,
          nama: "",
          alamat: "",
          jenis_kelamin: "",
          tlp: "",
          action: "",
          search: "",
      }
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
          this.state.role = localStorage.getItem('role')
          this.state.token = localStorage.getItem('token')
          this.state.id_member = localStorage.getItem('id_member')
        } else {
          window.alert("You are not an admin")
          window.location = '/login'
        }
      } else {
        window.location = "/login"
      }
    }
  

  bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    close=()=>{
      $("#modal").hide();
  }
  
    getMember = () => {
      let url = "http://localhost:8080/member";
      // mengakses api untuk mengambil data pegawai
      axios.get(url)
      .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({member: response.data.member});
      })
      .catch(error => {
        console.log(error);
      });
    }

    searching = event => {
      if(event.keyCode === 13){
          // 13 adalah kode untuk tombol enter
          let keyword = this.state.keyword.toLowerCase()
          let tempMember = this.state.member
          let result = tempMember.filter(item => {
              return item.nama.toLowerCase().includes(keyword) ||
              item.alamat.toLowerCase().includes(keyword) ||
              item.tlp.toLowerCase().includes(keyword) 

          })
          this.setState({member: result})
      }
  }
  
    findMember = (event) => {
      let url = "http://localhost:8080/member";
      if (event.keyCode === 13) {
        // menampung data keyword pencarian
        let form = {
          find: this.state.search
        }
        // mengakses api untuk mengambil data pegawai
        // berdasarkan keyword
        axios.post(url, form)
        .then(response => {
          // mengisikan data dari respon API ke array pegawai
          this.setState({member: response.data.member});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    handleChoose = (item) => {
        let confirmAction = window.confirm("Choose " + item.nama + " ?")
          if (confirmAction) {
            alert("successfully executed member");
            localStorage.setItem("id_member", item.id_member);
            localStorage.setItem("nama_member", item.nama);
            localStorage.setItem("alamat_member", item.alamat);
            localStorage.setItem("jenis_kelamin", item.jenis_kelamin);
            localStorage.setItem("tlp_member", item.tlp);
            if (localStorage.getItem('role') === "admin"){
              window.location = '/paket'
            } if (localStorage.getItem('role') === "kasir"){
              window.location = '/paket'
            } 
            
          } else {
            alert("Canceled to choose member");
          }
      }
  
    componentDidMount(){
      // method yang pertama kali dipanggil pada saat load page
      this.getMember()
    }    

  render(){
      return (
        <Container>
          <NavbarKasir />
          <Table {...TableObjTwo} />
          <ContainerSm>
          <input type="text" className="form-control my-2" placeholder="Pencarian"
                            value={this.state.keyword}
                            onChange={ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            />
          </ContainerSm>
          {/* tampilan tabel Member */}
          <Tabel>
            <Thead>
              <Tr>
                 <Th>Id Member</Th>
                 <Th>Nama</Th>
                 <Th>Alamat</Th>
                 <Th>Jenis Kelamin</Th>
                 <Th>No Telepon</Th>
                 <Th>Option</Th>
              </Tr>
            </Thead>
            <tbody>
              {this.state.member.map((item,index) => {
                return (
                <Tr key={index}>
                  <Td>{item.id_member}</Td>
                  <Td>{item.nama}</Td>
                  <Td>{item.alamat}</Td>
                  <Td>{item.jenis_kelamin}</Td>
                  <Td>{item.tlp}</Td>
                  <Td>

                  <Button primary onClick={() => this.handleChoose(item)}>Choose</Button>
                                      </Td>
                                  </Tr>
                              );
                          })}
                      </tbody>
                  </Tabel>
                  <br/>
                  {/* modal member */}
                  <div className="modal" id="modal">
                      <div className="modal-dialog">
                          <div className="modal-content">
                          <div className="modal-header">
                              <h5><strong>Form Member</strong></h5>
                              <button type="button" class="close" aria-label="Close" onClick={()=>this.close()}>
                                  <span aria-hidden="true">&times;</span>
                              </button>
                              </div>
                              <form onSubmit={this.SaveMember}>
                                  <div className="modal-body">
                                      Id Member
                                      <input type="number" name="id_member" value={this.state.id_member} onChange={this.bind} className="form-control" readOnly />
                                      Nama
                                      <input type="text" name="nama" value={this.state.nama} onChange={this.bind} className="form-control" required />  
                                      Alamat
                                      <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind} className="form-control" required />
                                      Jenis Kelamin
                                      <input type="text" name="jenis_kelamin" value={this.state.jenis_kelamin} onChange={this.bind} className="form-control" required />
                                      No Telepon
                                      <input type="text" name="tlp" value={this.state.tlp} onChange={this.bind} className="form-control" required />    
                                  </div>
                                  <div className="modal-footer">
                                      <button className="btn btn-sm btn-success" type="submit">
                                      Simpan
                                      </button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
        </Container>
      );
  }
}

export default Member