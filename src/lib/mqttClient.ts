import mqtt, { MqttClient, IClientOptions } from 'mqtt';

let client: MqttClient | null = null;

export function connectMQTT(): MqttClient {
    // เช็คว่าถ้ามี connection อยู่แล้วและยังเชื่อมต่ออยู่ ไม่ต้องสร้างใหม่
    if (client && client.connected) return client;

    // สำหรับ RabbitMQ Web-MQTT ปกติจะใช้ port 15675 (WS) หรือ 15676 (WSS)
    const brokerUrl = "ws://localhost:15675/ws"; 

    const options: IClientOptions = {
        username: "keemmer",
        password: "buncha.pi0",
        protocol: 'ws',
        reconnectPeriod: 5000, // พยายามเชื่อมใหม่ทุก 5 วินาทีถ้าหลุด
        connectTimeout: 30 * 1000,
        clientId: 'hexdas_browser_' + Math.random().toString(16).substring(2, 8),
    };

    client = mqtt.connect(brokerUrl, options);

    client.on('connect', () => {
        console.log('✅ Connected to MQTT broker');
        // เมื่อต่อติดแล้ว ให้ Subscribe topic ที่ต้องการทันที
        client?.subscribe('home/lights/#'); 
    });

    client.on('error', (err) => {
        console.error('❌ MQTT Connection Error:', err);
    });

    return client;
}