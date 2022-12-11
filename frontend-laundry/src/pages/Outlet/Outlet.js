import React, { Component } from 'react';
import { TableObjOne } from './Data';
import { Navbar, Table } from '../../components';
import { Container, Button, ButtonSm, ContainerSm } from '../../globalStyles';
import $ from 'jquery';
import axios from 'axios';
import {Tabel, Thead, Tr, Th, Td} from '../../components/Table/TableElements'


class Outlet extends React.Component {  
  constructor() {
      super();
      this.state = {
          outlet: [], //array pegawai untuk menampung data pegawai
          id_outlet: 0,
          nama: "",
          alamat: "",
          tlp: "",
          action: "",
          search: "",
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
  
    Add = () => {

      $("#modal").show()
      // mengosongkan isi variabel nip, nama, dan alamat
      // set action menjadi "insert"
      this.setState({
        id_outlet: "",
        nama: "",
        alamat: "",
        tlp: "",
        action: "insert"
      });
    }
  
    Edit = (item) => {
      let url= "http://localhost:8080/outlet/" + item.id_outlet
      axios.get(url)
      /*
      - mengisikan isi variabel nip, nama, alamat sesuai dengan data yang
      akan diedit
      - set action menjadi "update"
      */
      $("#modal").show()
      this.setState({
        id_outlet: item.id_outlet,
        nama: item.nama,
        alamat: item.alamat,
        tlp: item.tlp,
        action: "update",
        selectedItem: item
      });
    }
  
    getOutlet = () => {
      let url = "http://localhost:8080/outlet";
      // mengakses api untuk mengambil data pegawai
      axios.get(url)
      .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({outlet: response.data.outlet});
      })
      .catch(error => {
        console.log(error);
      });
    }

    searching = event => {
      if(event.keyCode === 13){
          // 13 adalah kode untuk tombol enter
          let keyword = this.state.keyword.toLowerCase()
          let tempOutlet = this.state.outlet
          let result = tempOutlet.filter(item => {
              return item.nama.toLowerCase().includes(keyword) ||
              item.alamat.toLowerCase().includes(keyword) ||
              item.tlp.toLowerCase().includes(keyword) 

          })
          this.setState({outlet: result})
      }
  }
  
    findOutlet = (event) => {
      let url = "http://localhost:8080/outlet";
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
          this.setState({outlet: response.data.outlet});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  
    SaveOutlet = (event) => {
      event.preventDefault();
      /* menampung data nip, nama dan alamat dari Form
      ke dalam FormData() untuk dikirim  */
      let form = {
        id_outlet: this.state.id_outlet,
        nama: this.state.nama,
        alamat: this.state.alamat,
        tlp: this.state.tlp
      }
      let url = "";
      if (this.state.action === "insert") {
        url = "http://localhost:8080/outlet"
        axios.post(url, form)
        .then(response => {
          // jika proses simpan berhasil, memanggil data yang terbaru
          this.getMember();
        })
        .catch(error => {
          console.log(error);
        });
      } else if (this.state.action === "update"){
        url = "http://localhost:8080/outlet/" + this.state.id_outlet
        axios.put(url, form)
        .then(response => {
          // jika proses simpan berhasil, memanggil data yang terbaru
          this.getOutlet();
        })
        .catch(error => {
          console.log(error);
        });
      }
  
      // menutup form modal
      $("#modal").hide();
    }
  
    Drop = (id_outlet) => {
      let url = "http://localhost:8080/outlet/" + id_outlet;
      // memanggil url API untuk menghapus data pada database
      if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        axios.delete(url)
        .then(response => {
          // jika proses hapus data berhasil, memanggil data yang terbaru
          this.getOutlet();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  
    componentDidMount(){
      // method yang pertama kali dipanggil pada saat load page
      this.getOutlet()
    }    

  render(){
      return (
        <Container>
          <Navbar />
          <Table {...TableObjOne} />
          <ContainerSm>
          <input type="text" className="form-control my-2" placeholder="Pencarian"
                            value={this.state.keyword}
                            onChange={ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            />
          </ContainerSm>
          {/* tampilan tabel pegawai */}
          <Tabel>
            <Thead>
              <Tr>
                 <Th>Id Outlet</Th>
                 <Th>Nama</Th>
                 <Th>Alamat</Th>
                 <Th>No Telepon</Th>
                 <Th>Option</Th>
              </Tr>
            </Thead>
            <tbody>
              {this.state.outlet.map((item,index) => {
                return (
                <Tr key={index}>
                  <Td>{item.id_outlet}</Td>
                  <Td>{item.nama}</Td>
                  <Td>{item.alamat}</Td>
                  <Td>{item.tlp}</Td>
                  <Td>

                  <ButtonSm secondary data-toggle="modal" data-target="#modal"  onClick={() => this.Edit(item)}>Edit</ButtonSm>|
                    <ButtonSm onClick={() => this.Drop(item.id_outlet)}>Hapus</ButtonSm>
                                      </Td>
                                  </Tr>
                              );
                          })}
                      </tbody>
                  </Tabel>
                  <br/>
                  <Button primary onClick={this.Add}>Tambah Data</Button>
                  <div className="modal" id="modal">
                      <div className="modal-dialog">
                          <div className="modal-content">
                          <div className="modal-header">
                              <h5><strong>Form Outlet</strong></h5>
                              <button type="button" class="close" aria-label="Close" onClick={()=>this.close()}>
                                  <span aria-hidden="true">&times;</span>
                              </button>
                              </div>
                              <form onSubmit={this.SaveOutlet}>
                                  <div className="modal-body">
                                      Id Outlet
                                      <input type="number" name="id_outlet" value={this.state.nip} onChange={this.bind} className="form-control" readOnly />
                                      Nama
                                      <input type="text" name="nama" value={this.state.nama} onChange={this.bind} className="form-control" required />  
                                      Alamat
                                      <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind} className="form-control" required />
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

export default Outlet