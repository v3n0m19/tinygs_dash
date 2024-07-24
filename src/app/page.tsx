"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";

interface StationDetails {
  name: string;
  userId: number;
  antennaBand: number[];
  autoTune: number;
  autoUpdate: boolean;
  beta: boolean;
  confirmedPackets: number;
  creationDate: number;
  elevation: number;
  lastSeen: number;
  local_ip: string;
  location: [number, number];
  modem_conf: string;
  radioStatus: number;
  satellite: string;
  status: number;
  telemetryPackets: number;
  test: boolean;
  tx: boolean;
  version: number;
  wifiRssi: number;
  antenna: string;
  frames: number;
  lastPacketTime: number;
  recordDistance: number;
}

const fetchStationDetails = async (): Promise<StationDetails> => {
  const response = await axios.get(
    "https://api.tinygs.com/v1/station/ROXX_LoRa@731332067"
  );
  return response.data;
};

const Home: React.FC = () => {
  const [stationDetails, setStationDetails] = useState<StationDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStationDetails();
        setStationDetails(data);
      } catch (err) {
        setError("Error fetching station details");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!stationDetails) {
    return <div className="text-white">Loading...</div>;
  }

  // Parse modem configuration
  const modemConfig = JSON.parse(stationDetails.modem_conf);
  const mode = modemConfig.mode || "N/A";
  const freq = modemConfig.freq || "N/A";
  const norad = modemConfig.NORAD || "N/A";
  const pwr = modemConfig.pwr || "N/A";
  const crc = modemConfig.crc ? "Enabled" : "Disabled";
  const gain = modemConfig.gain || "N/A";
  const satellite = stationDetails.satellite || "N/A";

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex md:w-[500px]"> {/* Adjusted width for profile card */}
          <Card className="bg-neutral-900 text-green-300 shadow-none border border-gray-600 rounded-md p-4">
            <div className="text-green-300 text-center text-xl font-bold border-b border-gray-600 pb-2">
              Station Details
            </div>
            <div className="p-2">
              <pre className="whitespace-pre-wrap p-2 rounded-md">
                <span className="text-[#55d1d9]">Name                :</span> <span className="text-[#f096b0]">{stationDetails.name}</span>
                <br />
                <span className="text-[#55d1d9]">User ID             :</span> <span className="text-[#f096b0]">{stationDetails.userId}</span>
                <br />
                <span className="text-[#55d1d9]">Location            :</span> <span className="text-[#f096b0]">{stationDetails.location[0]},  {stationDetails.location[1]}</span>
                <br />
                <span className="text-[#55d1d9]">Elevation           :</span> <span className="text-[#f096b0]">{stationDetails.elevation} meters</span>
                <br />
                <span className="text-[#55d1d9]">Antenna             :</span> <span className="text-[#f096b0]">{stationDetails.antenna}</span>
                <br />
                <span className="text-[#55d1d9]">Auto Tune Frequency :</span> <span className="text-[#f096b0]">{stationDetails.autoTune} MHz</span>
                <br />
                <span className="text-[#55d1d9]">Confirmed Packets   :</span> <span className="text-[#f096b0]">{stationDetails.confirmedPackets}</span>
                <br />
                <span className="text-[#55d1d9]">Last Packet Time    :</span> <span className="text-[#f096b0]">{new Date(stationDetails.lastPacketTime).toLocaleString()}</span>
              </pre>
            </div>
          </Card>
        </div>
        <div className="flex flex-col space-y-4 md:w-[350px]"> {/* Adjusted width for satellite and modem config cards */}
          <Card className="bg-neutral-900 text-green-300 shadow-none border border-gray-600 rounded-md">
            <div className="p-2">
              <pre className="whitespace-pre-wrap p-2 rounded-md text-center">
                <span className="text-green-300 text-3xl">{satellite}</span> {/* Updated color and font size */}
              </pre>
            </div>
          </Card> 
          <Card className="bg-neutral-900 text-green-300 shadow-none border border-gray-600 rounded-md p-4">
            <div className="p-2">
              <pre className="whitespace-pre-wrap p-2 rounded-md">
                <span className="text-[#55d1d9]">Mode      :</span> <span className="text-[#f096b0]">{mode}</span>
                <br />
                <span className="text-[#55d1d9]">Frequency :</span> <span className="text-[#f096b0]">{freq} MHz</span>
                <br />
                <span className="text-[#55d1d9]">NORAD     :</span> <span className="text-[#f096b0]">{norad}</span>
                <br />
                <span className="text-[#55d1d9]">Power     :</span> <span className="text-[#f096b0]">{pwr}</span>
                <br />
                <span className="text-[#55d1d9]">CRC       :</span> <span className="text-[#f096b0]">{crc}</span>
                <br />
                <span className="text-[#55d1d9]">Gain      :</span> <span className="text-[#f096b0]">{gain}</span>
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
