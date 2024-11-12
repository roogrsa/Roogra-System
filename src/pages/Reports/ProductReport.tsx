import { useLocation } from 'react-router-dom';
import ReportType from '../../components/reports/ReportType';

const ProductReport = () => {
  const location = useLocation();
    const { id } = location.state || {};
  return (
    <div>
      <ReportType reportType="product" query={id}/>
    </div>
  );
};

export default ProductReport;
