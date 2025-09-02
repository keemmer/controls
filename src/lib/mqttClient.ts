import mqtt, { MqttClient, IClientOptions } from 'mqtt';

let client: MqttClient | null = null;

export function connectMQTT(): MqttClient {
	if (client) return client;

	const brokerUrl = "http://localhost:15675/ws"; // Adjust the URL as needed
	const options: IClientOptions = {
		username: "keemmer",
		password: "buncha.pi0",
		protocol: 'ws',
		reconnectPeriod: 1000,
		connectTimeout: 30 * 1000,
	};
	client = mqtt.connect(brokerUrl, options);

	client.on('connect', () => {
		console.log('✅ Connected to MQTT broker');
	});

	client.on('error', (err) => {
		console.error('❌ MQTT Connection Error:', err);
		client?.end();
	});

	return client;
}
