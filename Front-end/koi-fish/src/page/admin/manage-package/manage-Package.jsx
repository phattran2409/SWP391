import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  Popconfirm,
  Upload,
  Select,
  Image,
  Pagination,
} from "antd";

import api from "../../../config/axios";
import TablePackage from "../../../components/Admin/manage-package-table/TablePackage";

export default function Package() { 
     const [packageData  , setPackageData] = useState(null);

    const fetchData =async () => { 
         try {
            const res = await api.get("/v1/package/"); 
            console.log(res);
            
            setPackageData(res.data.data); 
            console.log(packageData);
         } catch (error) {
            console.log(error);
         }
    } 
    const handleUpdate = () => {
     fetchData();
    }
    useEffect( () =>{ 
         fetchData();
        
    } , [])

      useEffect(() => {
        console.log("Updated packageData:", packageData);
      }, [packageData]);
 
    return (
        <>
          <TablePackage dataPackage={packageData} onUpdate={handleUpdate}/>
        </>
    );
     
}