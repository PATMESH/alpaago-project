import React, { useState, useEffect,useMemo } from 'react';
import logo from './img/logo.png';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { db } from '../../firebase/Config';
import { Modal, Button ,Input } from 'antd';

const Users = ({ home, setHome, auth, setAuth }) => {
  const [rowData, setRowData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [email ,setEmail] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUser, setUserModalVisible] = useState(false);

  const [fetchdata , setfetchData] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersSnapshot = await db.collection('users').get();
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRowData(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error.message);
      }
    };

    fetchUsersData();
  }, [isModalVisible , isModalUser , fetchdata]);

  const showUserModal = () => {
    setUserModalVisible(true);
  };

  const showModal = (data) => {
    setSelectedUserId(data)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedUserId) {
      setTimeout(() => {
        handleDeleteUser(selectedUserId);
        setSelectedUserId(null);
      }, 0);
    }
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setSelectedUserId(null);
    setIsModalVisible(false);
  };

  const addUser = async() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      await db.collection("users").add({
        name: username,
        email: email,
        status: "Inactive",
        addedDate: formattedDate,
      });
      setEmail(null);
      setUsername(null);
      setUserModalVisible(false);
  };

  const handleUserCancel = () => {
    setUserModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-name');
    setAuth({
      ...auth,
      authenticated: false,
    });
  };

  const autoSizeStrategy = useMemo(() => {
    return {
      type: 'fitGridWidth',
    };
  }, []);

  const handleActivateUser = (id) => {
    const userRef = db.collection('users').doc(id);
    userRef.update({ status: 'Active' })
      .then(() => {
        console.log('User activated successfully');
      })
      .catch((error) => {
        console.error('Error activating user:', error);
      });
      setfetchData(!fetchdata);
  };
  
  const handleDeactivateUser = (id) => {
    const userRef = db.collection('users').doc(id);
    userRef.update({ status: 'Inactive' })
      .then(() => {
        console.log('User deactivated successfully');
      })
      .catch((error) => {
        console.error('Error deactivating user:', error); 
      });
      setfetchData(!fetchdata);
  };
  
  const handleDeleteUser = (data) => {
    db.collection("users").doc(data).delete();
  };

  const getHeaderTemplate = function (type) {
    return {
      template:
        '<div class="ag-cell-label-container" role="presentation" style="text-align: center;justify-content:center;padding-left:70px">' +
        '  <a href="#" class="filterinfo ms-2" data-type="' +
        type +
        '"><i class="bi bi-info-circle-fill text-primary"></i></a>' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
        '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        "  </div>" +
        "</div>",
    };
  };
  const getHeaderTemplate1 = function (type) {
    return {
      template:
        '<div class="ag-cell-label-container" role="presentation" style="text-align: center;justify-content:center;padding-left:130px">' +
        '  <a href="#" class="filterinfo ms-2" data-type="' +
        type +
        '"><i class="bi bi-info-circle-fill text-primary"></i></a>' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
        '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        "  </div>" +
        "</div>",
    };
  };
  const columnDefs = [
    { headerName: 'Username',headerClass:'cen', field: 'name', sortable: true, filter: true, cellStyle: { textAlign: 'center' }, headerComponentParams: getHeaderTemplate},
    { headerName: 'Email', field: 'email', sortable: true, filter: true, cellStyle: { textAlign: 'center' }, headerComponentParams: getHeaderTemplate1, minWidth: 300, maxWidth: 400},
    { headerName: 'Added Date', field: 'addedDate', sortable: true, filter: 'agDateColumnFilter', cellStyle: { textAlign: 'center' }, headerComponentParams:getHeaderTemplate},
    { headerName: 'Status', field: 'status', sortable: true, filter: true, cellStyle: { textAlign: 'center' }, headerComponentParams:getHeaderTemplate},
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div style={{ textAlign: 'center' }}>
          {params.data.status === 'Active' ? (
            <>
              <button onClick={() => handleDeactivateUser(params.data.id)} className='deactivate'>Deactivate</button>
              <button onClick={() => showModal(params.data.id)} className='delete'>Delete</button>
            </>
          ) : (
            <>
              <button onClick={() => handleActivateUser(params.data.id)} className='activate'>Activate</button>
              <button onClick={() => showModal(params.data.id)} className='delete'>Delete</button>
            </>
          )}
        </div>
      ),
      headerComponentParams:getHeaderTemplate,
      cellStyle: { textAlign: 'center' },
    }
  ];



  return (
    <div>
      <nav>
        <div className="logo-cont">
          <img src={logo} alt="logo" className="logo" />
          <span>Alpaago</span>
        </div>
        <div className="action-btns">
          <span onClick={() => setHome(true)}>Home</span>
          <button className="logout-btn" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </nav>

      <div className='btn-container'><button onClick={showUserModal}>Add User</button></div>
      <div className="ag-theme-alpine table-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
      
      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to Delete?</p>
      </Modal>

      <Modal
      title="Add User"
      visible={isModalUser}
      onOk={() => addUser(username, email)}
      onCancel={handleUserCancel}
    >
      <div>
        <label>Username:</label>
        <Input
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <Input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
    </Modal>

    </div>
  );
};

export default Users;
