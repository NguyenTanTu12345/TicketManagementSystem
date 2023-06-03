using Microsoft.EntityFrameworkCore;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.Helpers
{
    public interface INewID
    {
        public string CreateUserID(List<string> listID);
        public string CreateLocationTypeID(List<string> listID);
        public string CreateLocationID(List<string> listID);
        public string CreateNewsID(List<string> listID);
        public string CreateProgramID(List<string> listID);
    }

    public class NewID : INewID
    {
        public string CreateUserID(List<string> listID)
        {
            List<string> listIDString = listID;
            List<int> listIDInt = new List<int>();
            int temp;

            try
            {
                if (listIDString.Count != 0)
                {
                    foreach (var ele in listIDString)
                    {
                        if (!int.TryParse(ele.Substring(2, ele.Length - 2), out temp))
                            throw new Exception("Error");
                        else
                            listIDInt.Add(temp);
                    }
                }
                else
                    return "US01";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            int currentID = listIDInt.Max();
            currentID++;
            if (currentID < 10)
                return "US0" + currentID;
            else
                return "US" + currentID;
        }

        public string CreateLocationTypeID(List<string> listID)
        {
            List<string> listIDString = listID;
            List<int> listIDInt = new List<int>();
            int temp;

            try
            {
                if (listIDString.Count != 0)
                {
                    foreach (var ele in listIDString)
                    {
                        if (!int.TryParse(ele.Substring(2, ele.Length - 2), out temp))
                            throw new Exception("Error");
                        else
                            listIDInt.Add(temp);
                    }
                }
                else
                    return "LT01";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            int currentID = listIDInt.Max();
            currentID++;
            if (currentID < 10)
                return "LT0" + currentID;
            else
                return "LT" + currentID;
        }

        public string CreateLocationID(List<string> listID)
        {
            List<string> listIDString = listID;
            List<int> listIDInt = new List<int>();
            int temp;

            try
            {
                if (listIDString.Count != 0)
                {
                    foreach (var ele in listIDString)
                    {
                        if (!int.TryParse(ele.Substring(2, ele.Length - 2), out temp))
                            throw new Exception("Error");
                        else
                            listIDInt.Add(temp);
                    }
                }
                else
                    return "LO01";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            int currentID = listIDInt.Max();
            currentID++;
            if (currentID < 10)
                return "LO0" + currentID;
            else
                return "LO" + currentID;
        }
        
        public string CreateNewsID(List<string> listID)
        {
            List<string> listIDString = listID;
            List<int> listIDInt = new List<int>();
            int temp;

            try
            {
                if (listIDString.Count != 0)
                {
                    foreach (var ele in listIDString)
                    {
                        if (!int.TryParse(ele.Substring(2, ele.Length - 2), out temp))
                            throw new Exception("Error");
                        else
                            listIDInt.Add(temp);
                    }
                }
                else
                    return "NE01";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            int currentID = listIDInt.Max();
            currentID++;
            if (currentID < 10)
                return "NE0" + currentID;
            else
                return "NE" + currentID;
        }

        public string CreateProgramID(List<string> listID)
        {
            List<string> listIDString = listID;
            List<int> listIDInt = new List<int>();
            int temp;

            try
            {
                if (listIDString.Count != 0)
                {
                    foreach (var ele in listIDString)
                    {
                        if (!int.TryParse(ele.Substring(2, ele.Length - 2), out temp))
                            throw new Exception("Error");
                        else
                            listIDInt.Add(temp);
                    }
                }
                else
                    return "PR01";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            int currentID = listIDInt.Max();
            currentID++;
            if (currentID < 10)
                return "PR0" + currentID;
            else
                return "PR" + currentID;
        }
    }
}
