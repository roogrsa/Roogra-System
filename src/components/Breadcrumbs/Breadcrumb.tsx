import { Link } from 'react-router-dom';
import useHandleBan from '../../hooks/useHandleBan';
import useBanProduct from '../../hooks/useBanProduct';

const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';

interface BreadcrumbLink {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  breadcrumbLinks: BreadcrumbLink[];
  pageName: string;
  product?: {
    id: number;
    is_banned: number;
  };
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbLinks,
  pageName,
  product,
}) => {
  const { banProduct } = useBanProduct(); // Custom API hook to ban/unban product
  const { handleBan, loading } = useHandleBan();

  return (
    <div className="mb-8 flex justify-between">
      {/* Breadcrumb Navigation */}
      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumbLinks.map((link, index) => (
            <li key={index}>
              <Link className="font-medium text-[20px]" to={link.path}>
                {link.label} {index < breadcrumbLinks.length - 1 && '/'}
              </Link>
            </li>
          ))}
          <li className="font-medium text-[20px] text-primary">{pageName}</li>
        </ol>
      </nav>

      {/* Ban/Unban Icon */}
      {product && (
        <div className="bg-BlockIconBg rounded-md">
          <img
            src={product.is_banned === 0 ? NotBannedIconSrc : BannedIconSrc}
            className={`w-8 h-7 text-center p-1 cursor-pointer ${
              loading ? 'opacity-50' : ''
            }`}
            onClick={() =>
              !loading &&
              product.id &&
              handleBan(product.id, product.is_banned === 1, banProduct)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
