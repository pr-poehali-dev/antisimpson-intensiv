import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
from datetime import datetime, timezone

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send registration notifications to Telegram
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version, memory_limit_in_mb
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    notification_type = body_data.get('type', 'registration')
    
    if notification_type == 'payment_success':
        invoice_id = body_data.get('invoiceId', 'Не указано')
        amount = body_data.get('amount', 'Не указано')
        timestamp = body_data.get('timestamp', 'Не указано')
        
        message = f"""💰 Оплата успешно получена!

🧾 Номер заказа: {invoice_id}
💵 Сумма: {amount} руб.
⏰ Время: {timestamp}

✅ Участник успешно зарегистрирован на интенсив!"""
    else:
        name = body_data.get('name', 'Не указано')
        email = body_data.get('email', 'Не указано')
        phone = body_data.get('phone', 'Не указано')
        
        now = datetime.now(timezone.utc).strftime('%d.%m.%Y %H:%M:%S UTC')
        
        message = f"""🔔 Новая заявка на интенсив!

👤 Имя: {name}
📧 Email: {email}
📱 Телефон: {phone}

⏰ Время: {now}"""
    
    telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }).encode('utf-8')
    
    req = urllib.request.Request(telegram_url, data=data)
    
    urllib.request.urlopen(req)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Notification sent'})
    }