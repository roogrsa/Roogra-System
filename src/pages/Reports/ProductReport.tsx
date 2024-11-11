import { useParams } from 'react-router-dom';
import ReportType from '../../components/reports/ReportType';

const ProductReport = () => {
  const { rt_search } = useParams();
  console.log(rt_search);
  return (
    <div>
      <ReportType reportType="product" query={rt_search}/>
    </div>
  );
};

export default ProductReport;
