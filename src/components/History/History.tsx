import { useEffect } from 'react'
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const History = () => {
    const dispatch = useDispatch();
    const { page } = useParams();

    useEffect(() => {
        dispatch(setActiveTab(page as Tabs));
    }, [page, dispatch]);


  return (
    <div>History</div>
  )
}

export default History