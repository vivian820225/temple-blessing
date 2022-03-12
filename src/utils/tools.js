import { MessageBox, Message } from 'element-ui'

/**
 * 提示工具
 * */
const Tools = {
  // 成功
  successTips (message, close = () => {}) {
    Message.closeAll()
    Message({ message, type: 'success', duration: 1500, onClose: close })
  },

  // 警告
  warningTips (message) {
    Message.closeAll()
    Message({ type: 'warning', message, duration: 3000 })
  },

  // 錯誤
  errorTips (message) {
    Message.closeAll()
    Message({ type: 'error', message, duration: 3000 })
  },

  // 確認視窗
  confirmBox ({ message, title = '提示', confirm = () => {}, cancel = () => {} }) {
    MessageBox.confirm(message, title, {
      confirmButtonText: '確定',
      cancelButtonText: '返回',
      type: 'warning'
    }).then(confirm).catch(cancel)
  },

  // 提示
  alertBox (message, callback = () => {}) {
    MessageBox.alert(message, '提示', {
      confirmButtonText: '確定'
    }).then(callback)
  },

  // 確認刪除
  confirmDelete (confirm, cancel) {
    this.confirmBox({ message: '確定要刪除嗎？', confirm, cancel })
  }
}

export default Tools
