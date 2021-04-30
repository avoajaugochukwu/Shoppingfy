import { Button, notification } from 'antd'
import { Link } from 'react-router-dom'

const btn = (
    <Button type="primary" size="small" onClick={() => notification.close()}>
      <Link to="/cart/">
                    Home
      </Link>
    </Button>
  );

export const openNotificationWithIcon = (
    type = 'success', 
    message = 'Notification', 
    description = 'Description'
    ) => {
    notification[type]({
        message,
        description,
        btn
    })
}