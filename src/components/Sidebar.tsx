import { FaUserCog, FaUsers, FaShoppingCart, FaChartBar, FaTags, FaBoxOpen, FaClipboardList, FaClipboardCheck } from 'react-icons/fa';

const menu = [
  { label: 'แดชบอร์ด', icon: <FaChartBar /> },
  { label: 'จุดขาย (POS)', icon: <FaShoppingCart /> },
  { label: 'ประเภทสินค้า', icon: <FaTags /> },
  { label: 'สินค้า & บริการ', icon: <FaBoxOpen /> },
  { label: 'จัดการสต็อก', icon: <FaClipboardList /> },
  {
    label: 'จัดการพนักงาน',
    children: [
      { label: 'ประเภทพนักงาน', icon: <FaUserCog /> },
      { label: 'พนักงาน', icon: <FaUsers /> },
    ],
  },
  { label: 'รายงานการขาย', icon: <FaChartBar /> },
  { label: 'รายงานค่าคอมมิชชัน', icon: <FaClipboardCheck /> },
  { label: 'ตั้งค่า', icon: <FaUserCog /> },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm p-4">
      <div className="text-xl font-bold mb-6 flex items-center gap-2">
        <FaChartBar className="text-purple-600" />
        <span className="text-gray-700">HEXDAS</span>
      </div>
      <ul className="space-y-2 text-sm text-purple-700">
        {menu.map((item, idx) => (
          <div key={idx}>
            <li className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded cursor-pointer">
              {item.icon && <span className="text-purple-600">{item.icon}</span>}
              <span>{item.label}</span>
            </li>
            {item.children && (
              <ul className="ml-6 space-y-1 text-purple-700">
                {item.children.map((child, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded cursor-pointer"
                  >
                    {child.icon && <span className="text-purple-400">{child.icon}</span>}
                    <span>{child.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
