import { Link } from 'react-router-dom';
import useBanProduct from '../../hooks/useBanProduct';
import useHandleAction from '../../hooks/useHandleAction';

const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';

interface BreadcrumbLink {
  label: string;
  path: string;
}

interface Product {
  id?: number;
  is_banned: number;
  product_name?: string;
  price?: number;
  category_name?: string;
  oc_product_description_description?: string;
  images?: string[];
  videos?: string[];
  isActivated?: number;
}

interface BreadcrumbProps {
  breadcrumbLinks: BreadcrumbLink[];
  pageName: string;
  product?: Product;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbLinks,
  pageName,
  product,
}) => {
  const { banProduct } = useBanProduct(); // API hook to ban/unban product
  const { handleAction, loading } = useHandleAction();
  const handleBan = (productId: number, isBanned: boolean) => {
    handleAction(productId, isBanned, 'ban', banProduct, {
      confirmButtonClass: 'bg-BlockIconBg',
      cancelButtonClass: 'bg-gray-300',
    });
  };
  return (
    <div className="mb-6 flex justify-between">
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
        <>
          <div
            className={`${
              product.is_banned === 0 ? 'bg-UnBlockIconBg' : 'bg-BlockIconBg'
            }  rounded-md`}
          >
            <img
              src={product.is_banned === 0 ? NotBannedIconSrc : BannedIconSrc}
              className={`w-8 h-7 text-center p-1 cursor-pointer ${
                loading ? 'opacity-50' : ''
              }`}
              onClick={() =>
                !loading &&
                product.id &&
                handleBan(product.id, product.is_banned === 1)
              }
            />
          </div>
          {/* <div className="bg-RemoveIconBg rounded-md">
            <img
              src={RemoveIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                user?.id &&
                handleAction(user.id, false, 'remove', removeUser, {
                  confirmButtonClass: 'bg-RemoveIconBg ', // Remove button class
                  cancelButtonClass: '', // Cancel button class
                })
              }
            /></div> */}
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
