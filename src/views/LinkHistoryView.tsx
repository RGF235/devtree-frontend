import { useQuery } from "@tanstack/react-query";
import { getLinkHistory } from "../api/DevTreeAPI";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Link as LinkIcon, RefreshCcw } from "lucide-react";

interface HistoryItem {
  _id: string;
  oldLinks: string;
  newLinks: string;
  modifiedAt: string;
}

export default function LinkHistoryView() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['link-history'],
    queryFn: getLinkHistory
  });

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) navigate('/auth/login');
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950">
        <p className="text-white text-xl animate-pulse">Cargando historial...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950">
        <p className="text-red-500 text-xl">Error cargando el historial</p>
      </div>
    );

return (
 <div
  className="min-h-screen py-12 px-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/back.svg')" }}
>
    <div className="backdrop-blur-sm bg-slate-900/70 min-h-screen absolute inset-0 -z-10"></div>

    <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 space-y-8 border border-white/20">
      <h1 className="text-4xl font-bold text-white text-center flex items-center justify-center gap-2">
        <RefreshCcw className="w-7 h-7 animate-spin-slow text-indigo-400" />
        Historial de Enlaces
      </h1>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-800">
        {data.map((item: HistoryItem) => (
          <div
            key={item._id}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition hover:shadow-2xl hover:scale-[1.02] duration-300 space-y-4 border border-white/30"
          >
            <div className="flex items-center text-gray-700 text-sm">
              <Clock className="w-4 h-4 mr-2 text-indigo-600" />
              <span>Modificado: {new Date(item.modifiedAt).toLocaleString()}</span>
            </div>

            <div className="text-slate-800 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-indigo-700 flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  Enlaces Anteriores
                </p>
                <ul className="list-disc list-inside ml-3">
                  {JSON.parse(item.oldLinks).map((link: any, index: number) => (
                    <li key={index}>
                      <span className="font-medium">{link.name}</span>:{" "}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        {link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-emerald-700 flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  Nuevos Enlaces
                </p>
                <ul className="list-disc list-inside ml-3">
                  {JSON.parse(item.newLinks).map((link: any, index: number) => (
                    <li key={index}>
                      <span className="font-medium">{link.name}</span>:{" "}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-500 hover:underline"
                      >
                        {link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-center text-slate-300 text-lg">Sin historial registrado.</p>
        )}
      </div>
    </div>
  </div>
);
}
