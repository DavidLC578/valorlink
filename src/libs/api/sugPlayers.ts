
export const getSuggestedPlayers = async () => {
    const res = await fetch("/api/players/sugPlayers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resJSON = await res.json();
    return resJSON;
}