import React from 'react';
import { TeamMemberList } from './TeamMemberList/TeamMemberList';
import api from '../utils/axios';

export const Home = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [totalRecords, setTotalRecords] = React.useState(0);

  const getData = async () => {
    const response = await api.get('/members');
    const formattedData = response.data.members.map((member: any) => {
      return {
        ...member,
        teams: member.teams.split(','),
        isActive: member.is_active,
      };
    });
    setData(formattedData);
    setLoading(false);
    setTotalRecords(response.data.count);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const deleteMember = async (id: number | null): Promise<boolean> => {
    if (id === null) return false;
    const res = await api.delete(`/members/${id}`);
    return res.status === 200 ? true : false;
  };

  const updateMember = async (
    id: number | null,
    member: any
  ): Promise<boolean> => {
    if (id === null) return false;
    const requestBody = {
      name: member.name,
      role: member.role,
      email: member.email,
      is_active: member.isActive,
      teams: member.teams.join(','),
      avatar: member.avatar,
      username: member.username,
    };

    const result = await api.patch(`/members/${id}`, requestBody);
    return result.status === 200 ? true : false;
  };

  const deleteMembersByIds = async (ids: number[]): Promise<boolean> => {
    //wait for all promises to resolve
    const promises = ids.map((id) => deleteMember(id));
    const results = await Promise.all(promises);
    return results.every((result) => result === true);
  };

  return (
    <div className="min-h-screen bg-white-100 text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <TeamMemberList
              members={data}
              loading={loading}
              deleteMember={deleteMember}
              updateMember={updateMember}
              deleteMembersByIds={deleteMembersByIds}
              totalRecords={totalRecords}
            />
          )}
        </div>
      </main>
    </div>
  );
};
