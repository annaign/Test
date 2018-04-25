import React from 'react';
import axios from 'axios';
import DownloadData from './components/DownloadData';
import Filter from './containers/Filter';
import Table from './Table';
import UnderTableBlock from './components/UnderTableBlock';
import Pagination from './components/Pagination';
import { urlSmall, urlBig } from './constants';
import './style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      showData: [],
      status: '',
      currentPage: 0,
      linesPerPage: 50,
      sortedColumn: '',
      sortDirection: 'up',
      filtredData: [],
      filterData: false,
      fullData: {
        id: -1, //не нужен, но оставлен на случай реальных данных где будут уникальные id
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
          streetAddress: '',
          city: '',
          state: '',
          zip: ''
        },
        description: ''
      }
    };
  }

  componentDidUpdate() {
    if (this.state.status === 'small' || this.state.status === 'big') {
      this.downloadData();
    }
  }

  onClickFilterData = filterData => {
    if (filterData) {
      const filtredData = this.state.tableData.filter(obj => {
        for (let element in obj) {
          if (
            element !== 'description' &&
            element !== 'address' &&
            obj[element]
              .toString()
              .toLowerCase()
              .search(filterData.toLowerCase()) !== -1
          ) {
            return true;
          }
        }

        return false;
      });

      //вычисление строк, которые будут загружены в таблицу
      let end = this.state.linesPerPage;
      if (filtredData.length < end) {
        end = filtredData.length;
      }

      const showData = filtredData.filter((element, index) => {
        if (index >= 0 && index < end) {
          return element;
        }
        return false;
      });

      this.setState({
        filterData: true,
        filtredData,
        showData,
        sortedColumn: '',
        sortDirection: 'up'
      });
    } else {
      //вычисление строк, которые будут загружены в таблицу
      const tableData = this.state.tableData;

      let end = this.state.linesPerPage;
      if (tableData.length < end) {
        end = tableData.length;
      }

      const showData = tableData.filter((element, index) => {
        if (index >= 0 && index < end) {
          return element;
        }
        return false;
      });

      this.setState({
        filterData: false,
        filtredData: [],
        showData,
        sortedColumn: '',
        sortDirection: 'up'
      });
    }
  };

  onClickAddData = btnType => {
    this.setState({ status: 'small' });

    if (btnType === 'small') {
      this.setState({ status: 'small' });
    } else if (btnType === 'big') {
      this.setState({ status: 'big' });
    }
  };

  onClickPagination = goToPage => {
    const tableData = this.state.filterData
      ? this.state.filtredData
      : this.state.tableData;
    const linesPerPage = this.state.linesPerPage;
    const currentPage = this.state.currentPage;

    if (goToPage === 'l') {
      if (currentPage > 1) {
        const showData = this.state.tableData.filter((element, index) => {
          const begin = linesPerPage * (currentPage - 2);
          let end = begin + linesPerPage;

          if (tableData.length < end) {
            end = tableData.length;
          }

          if (index >= begin && index < end) {
            return true;
          }
          return false;
        });

        this.setState({ showData: showData, currentPage: currentPage - 1 });
      }
    } else {
      if (linesPerPage * currentPage < tableData.length) {
        const showData = this.state.tableData.filter((element, index) => {
          const begin = linesPerPage * currentPage;
          let end = begin + linesPerPage;

          if (tableData.length < end) {
            end = tableData.length;
          }

          if (index >= begin && index < end) {
            return true;
          }
          return false;
        });

        this.setState({ showData: showData, currentPage: currentPage + 1 });
      }
    }
  };

  onClickSort = column => {
    const tableData = this.state.filterData
      ? this.state.filtredData.slice()
      : this.state.tableData.slice();
    const sortedColumn = this.state.sortedColumn;
    const sortDirection = this.state.sortDirection;
    let sorting;

    //сортировка по новому столбцу
    if (sortedColumn !== column) {
      switch (column) {
        case 'id':
          tableData.sort(function(value1, value2) {
            return value2[column] - value1[column];
          });
          break;
        default:
          tableData.sort(function(value1, value2) {
            let str1 = value1[column].toLowerCase();
            let str2 = value2[column].toLowerCase();

            if (str1 < str2) return 1;
            if (str1 > str2) return -1;
            return 0;
          });
      }
    } else {
      //сортировка по старому столбцу =>  поменять направление сортировки
      tableData.reverse();
    }
    if (sortDirection === 'up') {
      sorting = 'down';
    } else {
      sorting = 'up';
    }

    //вычисление строк, которые будут загружены в таблицу
    let end = this.state.linesPerPage;
    if (tableData.length < end) {
      end = tableData.length;
    }

    const showData = tableData.filter((element, index) => {
      if (index >= 0 && index < end) {
        return element;
      }
      return false;
    });

    if (this.state.filterData) {
      this.setState({
        filtredData: tableData,
        showData,
        currentPage: 1,
        sortedColumn: column,
        sortDirection: sorting
      });
    } else {
      this.setState({
        tableData,
        showData,
        currentPage: 1,
        sortedColumn: column,
        sortDirection: sorting
      });
    }
  };

  downloadData = () => {
    this.setState({ status: 'downloading' });

    let url;
    if (this.state.status === 'small') {
      url = urlSmall;
    } else if (this.state.status === 'big') {
      url = urlBig;
    }

    axios
      .get(url)
      .then(response => {
        const tableData = response.data;
        const linesPerPage = this.state.linesPerPage;

        //вычисление строк, которые будут загружены в таблицу
        let end = linesPerPage;

        if (tableData.length < end) {
          end = tableData.length;
        }

        const showData = tableData.filter((element, index) => {
          if (index >= 0 && index < end) {
            return true;
          }
          return false;
        });

        this.setState({
          status: '',
          tableData,
          showData,
          currentPage: 1,
          sortedColumn: ''
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  showFullData = fullData => {
    this.setState({ fullData: fullData });
  };

  render() {
    const {
      status,
      showData,
      fullData,
      sortedColumn,
      sortDirection
    } = this.state;

    return (
      <React.Fragment>
        <div className="header">
          <DownloadData onClick={this.onClickAddData} />
          <div className="statusBlock">{status ? 'Downloading...' : ''}</div>
          <Filter onClick={this.onClickFilterData} />
        </div>

        <Table
          tableData={showData}
          onClickData={this.showFullData}
          onClickSort={this.onClickSort}
          sortedColumn={sortedColumn}
          sortDirection={sortDirection}
        />

        <Pagination onClick={this.onClickPagination} />

        <UnderTableBlock fullData={fullData} />
      </React.Fragment>
    );
  }
}
